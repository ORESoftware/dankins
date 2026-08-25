#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

import { renderJenkinsfile } from '../src/index.mjs';

const [path, ...extra] = process.argv.slice(2);
if (!path || extra.length > 0) {
  process.stderr.write('usage: dankins PIPELINE.json\n');
  process.exitCode = 2;
} else {
  try {
    const source = await readFile(path, { encoding: 'utf8', flag: 'r' });
    if (Buffer.byteLength(source) > 256 * 1024) {
      throw new RangeError('pipeline contract exceeds 256 KiB');
    }
    process.stdout.write(renderJenkinsfile(JSON.parse(source)));
  } catch (error) {
    process.stderr.write(`dankins: ${error.message}\n`);
    process.exitCode = 1;
  }
}
