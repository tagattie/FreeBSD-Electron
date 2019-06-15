--- electron/spec/api-shell-spec.js.orig	2019-06-14 21:14:47 UTC
+++ electron/spec/api-shell-spec.js
@@ -35,7 +35,7 @@ describe('shell module', () => {
       await closeWindow(w)
       w = null
       // reset env vars to prevent side effects
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         process.env.DE = envVars.de
         process.env.BROWSER = envVars.browser
         process.env.DISPLAY = envVars.display
@@ -48,6 +48,10 @@ describe('shell module', () => {
         process.env.BROWSER = '/bin/true'
         process.env.DE = 'generic'
         process.env.DISPLAY = ''
+      } else if (process.platform === 'freebsd') {
+        process.env.BROWSER = '/usr/bin/true'
+        process.env.DE = 'generic'
+        process.env.DISPLAY = ''
       }
 
       // Ensure an external window is activated via a new window's blur event
@@ -75,6 +79,10 @@ describe('shell module', () => {
       if (process.platform === 'linux') {
         process.env.DE = 'generic'
         process.env.DE = '/bin/true'
+        process.env.DISPLAY = ''
+      } else if (process.platform === 'freebsd') {
+        process.env.DE = 'generic'
+        process.env.DE = '/usr/bin/true'
         process.env.DISPLAY = ''
       }
 
