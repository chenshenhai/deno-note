#!/usr/bin/env deno --allow-all
import { assertEquals } from "https://deno.land/std@0.59.0/testing/asserts.ts";

import { BufferReader } from "./../buffer_reader/mod.ts";
import { sleep } from './util.ts';

const test = Deno.test;
const run = Deno.run;

test('cmd/progress_test', async function() {
  let process = run({
    cwd: "./demo/cmd",
    cmd: [
      Deno.execPath(), 
      "run", 
      "progress.ts", 
    ],
    stdout: "piped"
  });
  const buffer: (Deno.Reader & Deno.Closer) | undefined = process.stdout;
  if (buffer) {
    await sleep(1200);
    const bufReader = new BufferReader(buffer);
    const line1 = await bufReader.readLine();
    assertEquals(line1, `[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 2%[306D[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 4%[306D[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 6%[306D[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 8%[306D[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 10%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 12%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 14%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 16%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 18%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 20%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 22%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 24%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 26%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 28%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 30%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 32%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 34%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 36%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 38%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 40%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 42%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 44%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 46%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 48%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 50%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 52%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 54%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 56%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 58%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 60%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 62%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 64%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 66%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 68%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 70%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 72%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 74%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 76%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 78%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 80%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K░[K 82%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K░[K 84%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K░[K 86%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K░[K 88%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K░[K 90%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K░[K 92%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K░[K 94%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K░[K 96%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K░[K 98%[307D[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K▓[K 100%[0C [K`);
    const line2 = await bufReader.readLine();
    assertEquals(line2, "");
  }

  process.close();
  process.stdout && process.stdout.close();
});