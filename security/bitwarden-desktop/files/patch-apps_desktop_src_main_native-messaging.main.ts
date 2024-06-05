--- apps/desktop/src/main/native-messaging.main.ts.orig	2024-05-20 20:31:10 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -190,7 +190,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           await this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -262,7 +262,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux": {
+      case "linux": case "freebsd": {
         await this.removeIfExists(
           `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
         );
