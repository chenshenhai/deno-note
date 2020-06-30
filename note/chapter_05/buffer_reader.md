# Buffer进阶读操作

## 前言

目前接触到的`Deno`开发很多操作都是对buffer的操作，例如一个用`Deno`实现的HTTP服务，经过TCP的连接对话接收到Conn数据，拿到的是一个“数据流”，需要开辟一个“缓冲区”来读取/运载 这些“数据流”中的一块块数据。将一块块数据块读取和拼接后还原数据流的信息。

这里的buffer数据包括是由`deno.Reader`、`deno.Writer`、`deno.Closer`，`deno.Buffer`和`deno.Conn`等接口实现或类派生出来的类。我在这里统一称为buffer数据或者流数据。


## 基础操作

### 读一个块

- 创建一个固定大小的缓冲区
- 把buffer利用缓冲区读取响应大小的信息，返回对应大小的数据

#### demo例子
 [https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/example_chunk.ts](https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/example_chunk.ts)

#### 源码讲解

```js
const decoder = new TextDecoder();
const encoder = new TextEncoder();

const str = `hello\r\nworld\r\n!\r\n`;
const stream = encoder.encode(str);
const reader = new Deno.Buffer(stream);
const chunk: Uint8Array = new Uint8Array(8);

async function main() {
  const result = await reader.read(chunk);
  console.log(result) // export:  8
  console.log(decoder.decode(chunk)); // export: hello\r\nw
}

main();
```

例子解读
- 在利用缓冲区块`chunk` 读取(运载)数据后，会返回一个结尾字符或者剩余长度 `Deno.EOF|number` 
  - `Deno.EOF` 是指`deno`的结尾数据类型
  - `number` 是指还需要继续读取长度为`chunk`长度的数据

### 读一个行

- 步骤1: 读一个块数据
- 步骤2: 判断当前块是否含换行符，有就截取开头到换行符前数据块，返回截取的数据块，如果没有换行符，就进入步骤3
- 步骤3: 再读一个块并开头连接上一个数据库块，重复步骤2
- 步骤4: 如果想再读一行数据，利用步骤2 剩下的数据块，从步骤1 开始执行下去


#### demo例子
 [https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/example_line.ts](https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/example_line.ts)

#### 源码讲解

`demo/buffer_reader/example_line.ts`

```js
const decoder = new TextDecoder();
const encoder = new TextEncoder();

// 数据流的原字符串
const str = `hello\r\nworld\r\n!\r\n`;

// 回车符
const CR = "\r".charCodeAt(0); 
// 换行符
const LF = "\n".charCodeAt(0);

// 待按行读取的数据流
const stream = encoder.encode(str);
// 待按行读取的数据缓存
const reader = new Deno.Buffer(stream);
const size = 8;

// 用来读取的数据的缓冲区
let chunk: Uint8Array = new Uint8Array(0);

// 数据读取是否到结尾
let eof = false;
// 缓冲区数据读取的当前的索引
let currentReadIndex = 0;

/** 
 * 是否为回车换行字符
 * @param {Uint8Array} buf
 * @return {bollean}
 * */ 
function isCRLF(buf: Uint8Array): boolean {
  return buf.byteLength === 2 && buf[0] === CR && buf[1] === LF;
}

/** 
 * 读取缓冲区当前已经读到的数据块
 * @return {Uint8Array}
 * */
function getCurrent(): Uint8Array {
  return chunk.subarray(currentReadIndex);
}


/** 
 * 读取一个数据块
 * @return {Promise<boolean>}
 * */
async function readChunk(): Promise<boolean> {
  let isNeedRead = false;
    
  if (eof === true) {
    return isNeedRead;
  }
  const tempChunk = new Uint8Array(size);
  const result = await reader.read(tempChunk);

  const nread: number = result === null ? 0 : result;
  if (nread === 0) {
    eof = true;
    return isNeedRead;
  } else {
    isNeedRead = true;
  }

  let remainLength = 0;
  if (chunk.byteLength > 0 ) {
    remainLength = chunk.byteLength - currentReadIndex
  }

  const newChunk = new Uint8Array(remainLength + nread);
  newChunk.set(chunk.subarray(currentReadIndex), 0);
  newChunk.set(tempChunk.subarray(0, nread), remainLength);
  currentReadIndex = 0;
  chunk = newChunk;
  return isNeedRead;
}

/** 
 * 读取一行
 * @return {Promise<string>}
 * */
async function readLine (): Promise<string>  {
  let lineBuf = new Uint8Array(0);
  while(!eof || chunk.length > 0) {
    const current = getCurrent();
    for (let i = 0; i < current.byteLength; i++) {
      if (current.byteLength <= 0) {
        continue;
      }
      const buf = current.subarray(i, i + 2);
      if (isCRLF(buf) === true) {
        lineBuf = current.subarray(0, i);
        currentReadIndex += i + 2;
        return decoder.decode(lineBuf);
      }
    }
    const result = await readChunk();
    if (!result) {
      break;
    }
  }

  const result = getCurrent();
  chunk = new Uint8Array(0);
  return decoder.decode(result);
}

async function main() {
  const line1 = await readLine();
  console.log(line1) // export:  "hello"
  const line2 = await readLine();
  console.log(line2); // export: "world"
  const line3 = await readLine();
  console.log(line3); // export: "!"
  const line4 = await readLine();
  console.log(line4); // export: ""
  const line5 = await readLine();
  console.log(line5); // export: ""
}

main();
```

## 封装读取数据流的类

### 实现 buffer_reader

#### demo例子
 [https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/mod.ts](https://github.com/chenshenhai/deno_note/blob/master/demo/buffer_reader/mod.ts)

#### 源码讲解

```js
// Based on https://github.com/lenkan/deno-http/blob/master/src/buffered-reader.ts
// Copyright (c) 2018 Daniel Lenksjö. All rights reserved.
// 参考源码: https://github.com/lenkan/deno-http/blob/master/src/buffered-reader.ts


const decoder = new TextDecoder();

// 回车符
const CR = "\r".charCodeAt(0); 
// 换行符
const LF = "\n".charCodeAt(0);

const MAX_BUFFER_SIZE = 4096;
const MIN_BUFFER_SIZE = 4;
const DEFAULT_BUFFER_SIZE = 256

interface BufReader {
  // 读取一行
  readLine(): Promise<string>;
  // 读取自定义块
  readCustomChunk(size: number): Promise<Uint8Array>;
  // 是否读数据结束
  isFinished(): boolean;
}

export class BufferReader implements BufReader {

  private _reader: Deno.Reader;
  private _size = DEFAULT_BUFFER_SIZE;
  // 数据读取是否到结尾
  private _eof = false;
  // 缓冲区数据读取的当前的索引
  private _currentReadIndex = 0;
  // 用来读取的数据的缓冲区
  private _chunk: Uint8Array = new Uint8Array(0);

  constructor(reader: Deno.Reader, size?: number) {
    this._reader = reader;
    if (size && size <= MAX_BUFFER_SIZE && size >= MIN_BUFFER_SIZE) {
      this._size = size;
    }
    this._chunk = new Uint8Array(0);
  }

  /** 
   * 是否读取结束
   * @return {bollean}
   * */ 
  isFinished(): boolean {
    return this._eof && this._current.byteLength === 0;
  }

  /** 
   * 读取一行
   * @return {Promise<string>}
   * */
  async readLine (): Promise<string>  {
    const chunk = await this.readLineChunk();
    const line: string = decoder.decode(chunk);
    return line;
  }

  /** 
   * 读取一行的块
   * @return {Promise<Uint8Array>}
   * */
  async readLineChunk (): Promise<Uint8Array>  {
    let lineBuf = new Uint8Array(0);
    while(!this._eof || this._chunk.length > 0) {
      const current = this._current;
      for (let i = 0; i < current.byteLength; i++) {
        if (current.byteLength <= 0) {
          continue;
        }
        const buf = current.subarray(i, i + 2);
        if (this._isCRLF(buf) === true) {
          lineBuf = current.subarray(0, i);
          this._currentReadIndex += i + 2;
          return lineBuf;
        }
      }
      const result = await this._readChunk();
      if (!result) {
        break;
      }
    }

    const result = this._current;
    this._chunk = new Uint8Array(0);
    return result;
  }

  /** 
   * 读取一个自定义长度的数据块
   * @return {Promise<boolean>}
   * */
  async readCustomChunk(size: number): Promise<Uint8Array>{
    let customLength = size;
    if (size < 0) {
      customLength = 0;
    }
    const current = this._current;
    const currentLength = current.length;
    let customChunk = new Uint8Array(0);

    if ( customLength <= currentLength ) {
      customChunk = current.subarray(0, customLength);
      this._currentReadIndex = customLength;
    } else {
      const remianingLength = customLength - currentLength;
      const remainingChunk = new Uint8Array(remianingLength);
      await this._reader.read(remainingChunk);
      customChunk = new Uint8Array(customLength);
      customChunk.set(current, 0);
      customChunk.set(remainingChunk, current.length);
    }
    this._chunk = new Uint8Array(0);
    this._currentReadIndex = 0;
    return customChunk;
  }

  /** 
   * 是否为回车换行字符
   * @param {Uint8Array} buf
   * @return {bollean}
   * */ 
  private _isCRLF(buf: Uint8Array): boolean {
    return buf.byteLength === 2 && buf[0] === CR && buf[1] === LF;
  }

  /** 
   * 读取缓冲区当前已经读到的数据块
   * @return {Uint8Array}
   * */
  private get _current() {
    return this._chunk.subarray(this._currentReadIndex);
  }

  /** 
   * 读取一个数据块
   * @return {Promise<boolean>}
   * */
  private async _readChunk(): Promise<boolean> {
    let isNeedRead = false;
    
    if (this._eof === true) {
      return isNeedRead;
    }
    const chunk = new Uint8Array(this._size);
    const result: number | null = await this._reader.read(chunk);
    const nread: number = result === null ? 0 : result;
    if (nread === 0) {
      this._eof = true;
      return isNeedRead;
    } else {
      isNeedRead = true;
    }

   
    let remainLength = 0;
    if (this._chunk.byteLength > 0 ) {
      remainLength = this._chunk.byteLength - this._currentReadIndex
    }

    const newChunk = new Uint8Array(remainLength + nread);
    newChunk.set(this._chunk.subarray(this._currentReadIndex), 0);
    newChunk.set(chunk.subarray(0, nread), remainLength);
    this._currentReadIndex = 0;
    this._chunk = newChunk;
    return isNeedRead;
  }

}

```

### 单元测试

```js
import { assertEquals } from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { BufferReader } from "./mod.ts";

const { test } = Deno;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

test({
  name: 'testBufferReaderMinSize',
  async fn(): Promise<void> {
    const strList = [
      "",
      "hello",
      "world",
      "!",
      "",
      "",
    ];
    const str = strList.join(`\r\n`);
    const stream = encoder.encode(str);
    const buf = new Deno.Buffer(stream);
    const bufReader : BufferReader = new BufferReader(buf, 4);
    let readLineIndex = 0;
    while(!bufReader.isFinished()) {
      const line = await bufReader.readLine();
      assertEquals(line, strList[readLineIndex]);
      readLineIndex ++;
    }
  }
});


test({
  name: 'testBufferReaderMaxSize', 
  async fn(): Promise<void> {
    const strList = [
      "",
      "hello",
      "world",
      "!",
      "",
      "",
    ];
    const str = strList.join(`\r\n`);
    const stream = encoder.encode(str);
    const buf = new Deno.Buffer(stream);
    const bufReader : BufferReader = new BufferReader(buf, 4096);
    let readLineIndex = 0;
    while(!bufReader.isFinished()) {
      const line = await bufReader.readLine();
      assertEquals(line, strList[readLineIndex]);
      readLineIndex ++;
    }
  }
});

test({
  name: 'testBufferReaderCustomSize',
  async fn(): Promise<void> {
    const strList = [
      "\r\n",
      "hello",
      "\r\n",
      "world",
      "\r\n",
      "!",
      "\r\n",
      "ha!"
    ];
    const str = strList.join("");
    const stream = encoder.encode(str);
    const buf = new Deno.Buffer(stream);
    const bufReader : BufferReader = new BufferReader(buf, 4096);
    const line1 = await bufReader.readLine();
    assertEquals(line1, "");
    const line2 = await bufReader.readLine();
    assertEquals(line2, "hello");
    const customChunk = await bufReader.readCustomChunk(8);
    const customStr = decoder.decode(customChunk);
    assertEquals(customStr, "world\r\n!");
  }
});
```