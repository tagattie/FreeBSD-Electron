--- src/main/nativeMessaging.main.ts.orig	2021-03-21 08:28:39 UTC
+++ src/main/nativeMessaging.main.ts
@@ -99,7 +99,7 @@ export class NativeMessagingMain {
                     this.logService.warning(`Chrome not found skipping.`);
                 }
                 break;
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (existsSync(`${this.homedir()}/.mozilla/`)) {
                     this.writeManifest(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`, firefoxJson);
                 }
@@ -130,7 +130,7 @@ export class NativeMessagingMain {
                     fs.unlink(`${this.homedir()}/Library/Application\ Support/Mozilla/NativeMessagingHosts/com.8bit.bitwarden.json`);
                 }
                 break;
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (existsSync(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`)) {
                     fs.unlink(`${this.homedir()}/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json`);
                 }
