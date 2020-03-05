--- electron/spec-main/api-crash-reporter-spec.ts.orig	2020-03-03 10:45:40 UTC
+++ electron/spec-main/api-crash-reporter-spec.ts
@@ -25,7 +25,7 @@ async function cleanup() {
 }
 
 // TODO(alexeykuzmin): [Ch66] This test fails on Linux. Fix it and enable back.
-ifdescribe(!process.mas && !process.env.DISABLE_CRASH_REPORTER_TESTS && process.platform !== 'linux')('crashReporter module', function () {
+ifdescribe(!process.mas && !process.env.DISABLE_CRASH_REPORTER_TESTS && process.platform !== 'linux' && process.platform !== 'freebsd')('crashReporter module', function () {
   let originalTempDirectory: string
   let tempDirectory = null
   const fixtures = path.resolve(__dirname, '..', 'spec', 'fixtures')
