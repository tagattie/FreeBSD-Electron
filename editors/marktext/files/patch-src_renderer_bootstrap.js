--- src/renderer/bootstrap.js.orig	2020-02-24 09:09:54 UTC
+++ src/renderer/bootstrap.js
@@ -1,5 +1,5 @@
 import path from 'path'
-import { crashReporter, ipcRenderer } from 'electron'
+import ipcRenderer from 'electron'
 import log from 'electron-log'
 import RendererPaths from './node/paths'
 
@@ -43,14 +43,6 @@ const parseUrlArgs = () => {
 }
 
 const bootstrapRenderer = () => {
-  // Start crash reporter to save core dumps for the renderer process
-  crashReporter.start({
-    companyName: 'marktext',
-    productName: 'marktext',
-    submitURL: 'http://0.0.0.0/',
-    uploadToServer: false
-  })
-
   // Register renderer exception handler
   window.addEventListener('error', event => {
     const { message, name, stack } = event.error
