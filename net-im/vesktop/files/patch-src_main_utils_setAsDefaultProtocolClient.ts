--- src/main/utils/setAsDefaultProtocolClient.ts.orig	2026-08-29 13:39:26 UTC
+++ src/main/utils/setAsDefaultProtocolClient.ts
@@ -8,7 +8,7 @@ export async function setAsDefaultProtocolClient(proto
 import { app } from "electron";
 
 export async function setAsDefaultProtocolClient(protocol: string) {
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== "freebsd") {
         return app.setAsDefaultProtocolClient(protocol);
     }
 
