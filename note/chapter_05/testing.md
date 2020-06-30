# 单元测试

## 前言

单元测试，是保证项目代码质量基本能力的环节，在项目的生命周期里占着比较重要的地位，也是项目开发过程中测试环节的第一道保障。

如果一个开发框架/语言 提供了单元测试的能力，那就能对使用该 框架/语言 的更有质量保证和开发的安全感。`Deno` 本身不提供测试能力，但是官方的标准库/模块 `deno_std` 提供了 单元测试的能力 [deno_std/testing](https://github.com/denoland/deno/blob/master/std/testing/README.md)


## 准备工作

基本所有单元测试能力都是大同小异，基本包括以下两个环节

- 单元划分
- 断言处理


`Deno`原生能力提供了 一下API
 
- `test` 测试单元
- `deno test` 测试命令

`Deno` 官方标准模块 `deno_std/testing` 提供了以下基础API

- `assert` 断言
- `equal` 判断

## 快速上手

### demo地址
[https://github.com/chenshenhai/deno-note/tree/master/demo/testing_unit](https://github.com/chenshenhai/deno-note/tree/master/demo/testing_unit)


### 实现源码

- 开发代码模块 `./demo/testing_unit/index.ts`

```js
function add (x: number, y : number): number {
  return x + y;
}

async function addAsync (x: number, y : number): Promise<number> {
  await new Promise(res => setTimeout(res, 100));
  return x + y;
}

export { add, addAsync };
```

- 测试代码 `./demo/testing_unit/test.ts`

```js
#!/usr/bin/env deno test --allow-all test.ts

import { assertEquals } from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { add, addAsync } from "./mod.ts";

const { test } = Deno;

test('example', function() {
  const result = add(1, 2);
  assertEquals(result, 3);
});

test('exampleAsync', async function() {
  const result = await addAsync(1, 2);
  assertEquals(result, 3);
});
rtEquals(result, 3);
});
```

### 执行单元测试

```sh
deno run --allow-all test.ts
```

![testing_unit.jpg](../image/testing_unit.jpg)