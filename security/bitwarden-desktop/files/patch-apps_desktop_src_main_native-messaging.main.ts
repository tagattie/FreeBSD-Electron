--- apps/desktop/src/main/native-messaging.main.ts.orig	2026-10-26 11:20:46 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -240,7 +240,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         // Because on linux, the path inside the sandbox is different, and we want to support:
         // Flatpak App, Unsandboxed App, Flatpak Browser, Unsandboxed Browser, Snap App, Unsandboxed App
         // and any combination of the above, we copy the binary to the applications native-messaging-hosts path
@@ -403,7 +403,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         for (const [key, value] of Object.entries(this.getLinuxNMHS())) {
           if (key === "Firefox") {
             await this.removeIfExists(
@@ -562,7 +562,7 @@ export class NativeMessagingMain {
           .map(([, value]) => value);
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         chromePaths = Object.entries(this.getLinuxNMHS())
           .filter(([key]) => key !== "Firefox")
           .map(([, value]) => value);
