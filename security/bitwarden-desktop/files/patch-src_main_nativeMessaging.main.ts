--- src/main/nativeMessaging.main.ts.orig	2021-10-29 14:09:30 UTC
+++ src/main/nativeMessaging.main.ts
@@ -117,7 +117,7 @@ export class NativeMessagingMain {
                     }
                 }
                 break;
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (existsSync(`${this.homedir()}/.mozilla/`)) {
                     this.writeManifest(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`, firefoxJson);
                 }
@@ -152,7 +152,7 @@ export class NativeMessagingMain {
                     }
                 }
                 break;
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)) {
                     fs.unlink(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`);
                 }
