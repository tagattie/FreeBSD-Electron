--- src/main/nativeMessaging.main.ts.orig	2022-02-11 22:23:03 UTC
+++ src/main/nativeMessaging.main.ts
@@ -133,7 +133,7 @@ export class NativeMessagingMain {
           }
         }
         break;
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           this.writeManifest(
             `${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`,
@@ -181,7 +181,7 @@ export class NativeMessagingMain {
           }
         }
         break;
-      case "linux":
+      case "linux": case "freebsd":
         if (
           existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)
         ) {
