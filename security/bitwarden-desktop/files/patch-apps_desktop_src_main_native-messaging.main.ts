--- apps/desktop/src/main/native-messaging.main.ts.orig	2023-02-08 12:02:47 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -137,7 +137,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -207,7 +207,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (
           existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)
         ) {
