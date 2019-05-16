--- electron/spec/api-shell-spec.js.orig	2019-05-16 02:12:58 UTC
+++ electron/spec/api-shell-spec.js
@@ -29,7 +29,7 @@ describe('shell module', () => {
 
     afterEach(() => {
       // reset env vars to prevent side effects
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         process.env.DE = envVars.de
         process.env.BROWSER = envVars.browser
         process.env.DISPLAY = envVars.display
@@ -42,6 +42,10 @@ describe('shell module', () => {
         process.env.BROWSER = '/bin/true'
         process.env.DE = 'generic'
         process.env.DISPLAY = ''
+      } else if (process.platform === 'freebsd') {
+        process.env.BROWSER = '/usr/bin/true'
+        process.env.DE = 'generic'
+        process.env.DISPLAY = ''
       }
 
       shell.openExternal(url).then(() => done())
@@ -52,6 +56,10 @@ describe('shell module', () => {
       if (process.platform === 'linux') {
         process.env.DE = 'generic'
         process.env.DE = '/bin/true'
+        process.env.DISPLAY = ''
+      } else if (process.platform === 'freebsd') {
+        process.env.DE = 'generic'
+        process.env.DE = '/usr/bin/true'
         process.env.DISPLAY = ''
       }
 
