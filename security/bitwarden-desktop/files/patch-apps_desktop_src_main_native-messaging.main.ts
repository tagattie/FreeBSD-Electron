--- apps/desktop/src/main/native-messaging.main.ts.orig	2026-01-07 19:48:19 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -183,7 +183,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         for (const [key, value] of Object.entries(this.getLinuxNMHS())) {
           if (existsSync(value)) {
             if (key === "Firefox") {
@@ -253,7 +253,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         for (const [key, value] of Object.entries(this.getLinuxNMHS())) {
           if (key === "Firefox") {
             await this.removeIfExists(
@@ -364,7 +364,7 @@ export class NativeMessagingMain {
           .map(([, value]) => value);
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         chromePaths = Object.entries(this.getLinuxNMHS())
           .filter(([key]) => key !== "Firefox")
           .map(([, value]) => value);
