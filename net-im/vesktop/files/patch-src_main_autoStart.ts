--- src/main/autoStart.ts.orig	2025-07-07 23:08:39 UTC
+++ src/main/autoStart.ts
@@ -55,4 +55,4 @@ const autoStartWindowsMac: AutoStart = {
     disable: () => app.setLoginItemSettings({ openAtLogin: false })
 };
 
-export const autoStart = process.platform === "linux" ? makeAutoStartLinux() : autoStartWindowsMac;
+export const autoStart = (process.platform === "linux" || process.platform === "freebsd") ? makeAutoStartLinux() : autoStartWindowsMac;
