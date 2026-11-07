--- src/main/utils/setAsDefaultProtocolClient.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/utils/setAsDefaultProtocolClient.ts
@@ -9,7 +9,7 @@ export async function setAsDefaultProtocolClient(proto
 import { app } from "electron";
 
 export async function setAsDefaultProtocolClient(protocol: string) {
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== "freebsd") {
         return app.setAsDefaultProtocolClient(protocol);
     }
 
