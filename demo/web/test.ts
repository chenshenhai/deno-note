#!/usr/bin/env deno run --allow-run --allow-net
import { assertEquals, equal } from "https://deno.land/std@0.56.0/testing/asserts.ts";
import { BufferReader } from "./../buffer_reader/mod.ts";

const test = Deno.test;
const run = Deno.run;

const testSite = "http://127.0.0.1:3001";
// 启动测试服务

let httpServer: Deno.Process;

async function startHTTPServer() {
  httpServer = run({
    cmd: [Deno.execPath(), "run", "--allow-net", "./demo/web/test_server.ts", "--", ".", "--cors"],
    stdout: "piped"
  });
  const buffer: (Deno.Reader & Deno.Closer) | undefined = httpServer.stdout;
  if (buffer) {
    const bufReader = new BufferReader(buffer);
    const line = await bufReader.readLine();
    equal("listening on 127.0.0.1:3001", line)
  }
}

function closeHTTPServer() {
  httpServer.close();
  httpServer.stdout && httpServer.stdout.close();
}

test('testWeb', async function() {
  try {
    // 等待服务启动
    await startHTTPServer();
    const res1 = await fetch(`${testSite}/hello`);
    const result = await res1.text();
    const expectResult = "hello world! middleware-002";
    assertEquals(result, expectResult);
  } finally {
    // 关闭测试服务
    closeHTTPServer();
  }
});
