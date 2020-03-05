--- electron/spec-main/api-subframe-spec.ts.orig	2020-03-03 10:53:39 UTC
+++ electron/spec-main/api-subframe-spec.ts
@@ -177,7 +177,7 @@ describe('renderer nodeIntegrationInSubFrames', () => 
 })
 
 // app.getAppMetrics() does not return sandbox information on Linux.
-ifdescribe(process.platform !== 'linux')('cross-site frame sandboxing', () => {
+ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('cross-site frame sandboxing', () => {
   let server: http.Server
   let crossSiteUrl: string
   let serverUrl: string
