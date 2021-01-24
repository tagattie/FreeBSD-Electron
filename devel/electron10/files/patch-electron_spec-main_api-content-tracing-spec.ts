--- electron/spec-main/api-content-tracing-spec.ts.orig	2021-01-14 16:50:03 UTC
+++ electron/spec-main/api-content-tracing-spec.ts
@@ -5,7 +5,7 @@ import * as path from 'path';
 import { ifdescribe, delay } from './spec-helpers';
 
 // FIXME: The tests are skipped on arm/arm64.
-ifdescribe(!(process.platform === 'linux' && ['arm', 'arm64'].includes(process.arch)))('contentTracing', () => {
+ifdescribe(!((process.platform === 'linux' || process.platform === 'freebsd') && ['arm', 'arm64'].includes(process.arch)))('contentTracing', () => {
   const record = async (options: TraceConfig | TraceCategoriesAndOptions, outputFilePath: string | undefined, recordTimeInMilliseconds = 1e1) => {
     await app.whenReady();
 
