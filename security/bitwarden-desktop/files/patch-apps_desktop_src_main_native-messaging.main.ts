--- apps/desktop/src/main/native-messaging.main.ts.orig	2024-10-17 20:14:05 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -180,7 +180,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           await this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -259,7 +259,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         await this.removeIfExists(
           `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
         );
