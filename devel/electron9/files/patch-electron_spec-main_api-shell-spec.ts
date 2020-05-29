--- electron/spec-main/api-shell-spec.ts.orig	2020-05-18 21:17:08 UTC
+++ electron/spec-main/api-shell-spec.ts
@@ -18,7 +18,7 @@ describe('shell module', () => {
 
     afterEach(async () => {
       // reset env vars to prevent side effects
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         process.env.DE = envVars.de;
         process.env.BROWSER = envVars.browser;
         process.env.DISPLAY = envVars.display;
@@ -31,6 +31,11 @@ describe('shell module', () => {
       let requestReceived;
       if (process.platform === 'linux') {
         process.env.BROWSER = '/bin/true';
+        process.env.DE = 'generic';
+        process.env.DISPLAY = '';
+        requestReceived = Promise.resolve();
+      } else if (process.platform === 'freebsd') {
+        process.env.BROWSER = '/usr/bin/true';
         process.env.DE = 'generic';
         process.env.DISPLAY = '';
         requestReceived = Promise.resolve();
