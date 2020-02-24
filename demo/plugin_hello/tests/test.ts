const filenameBase = "libplugin_hello";

let filenameSuffix = ".so";
let filenamePrefix = "lib";

if (Deno.build.os === "win") {
  filenameSuffix = ".dll";
  filenamePrefix = "";
}
if (Deno.build.os === "mac") {
  filenamePrefix = "";
  filenameSuffix = ".dylib";
}

const filename = `../target/debug/${filenamePrefix}${filenameBase}${filenameSuffix}`;

const plugin = Deno.openPlugin(filename);

const { testSync, testAsync } = plugin.ops;

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

// 执行 调用插件的 同步方法
const response = testSync.dispatch(
  textEncoder.encode('hello'),
  textEncoder.encode('sync'),
);
console.log(`[Deno] testSync Response: ${textDecoder.decode(response)}`);

console.log('-------------------------------')

// 执行 调用插件的 异步方法
// 注册异步的回调操作
testAsync.setAsyncHandler(res => {
  console.log(`[Deno] testAsync Response: ${textDecoder.decode(res)}`);
});
// 触发异步方法事件
testAsync.dispatch(
  textEncoder.encode('test'),
  textEncoder.encode('test'),
);
