--- apps/desktop/src/main/native-messaging.main.ts.orig	2024-05-06 13:04:55 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -188,7 +188,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           await this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -260,7 +260,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         await this.removeIfExists(
           `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
         );
