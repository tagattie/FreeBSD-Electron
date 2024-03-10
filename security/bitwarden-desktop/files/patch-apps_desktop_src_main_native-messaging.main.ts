--- apps/desktop/src/main/native-messaging.main.ts.orig	2024-03-06 20:31:11 UTC
+++ apps/desktop/src/main/native-messaging.main.ts
@@ -145,7 +145,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (existsSync(`${this.homedir()}/.mozilla/`)) {
           // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
           // eslint-disable-next-line @typescript-eslint/no-floating-promises
@@ -231,7 +231,7 @@ export class NativeMessagingMain {
         }
         break;
       }
-      case "linux":
+      case "linux": case "freebsd":
         if (
           existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)
         ) {
