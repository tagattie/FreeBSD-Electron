--- apps/desktop/src/main/native-messaging.main.ts.orig	2026-08-10 20:48:17 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -209,7 +209,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         // Because on linux, the path inside the sandbox is different, and we want to support:
         // Flatpak App, Unsandboxed App, Flatpak Browser, Unsandboxed Browser, Snap App, Unsandboxed App
         // and any combination of the above, we copy the binary to the applications native-messaging-hosts path
@@ -328,7 +328,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         for (const [key, value] of Object.entries(this.getLinuxNMHS())) {
           if (key === "Firefox") {
             await this.removeIfExists(
@@ -473,7 +473,7 @@ export class NativeMessagingMain {
           .map(([, value]) => value);
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         chromePaths = Object.entries(this.getLinuxNMHS())
           .filter(([key]) => key !== "Firefox")
           .map(([, value]) => value);
