--- apps/desktop/src/main/nativeMessaging.main.ts.orig	2022-07-06 07:50:40 UTC
+++ apps/desktop/src/main/nativeMessaging.main.ts
@@ -136,7 +136,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -185,7 +185,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (
           existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)
         ) {
