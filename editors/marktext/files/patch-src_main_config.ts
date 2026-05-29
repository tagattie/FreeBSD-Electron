--- src/main/config.ts.orig	2026-05-29 12:03:18 UTC
+++ src/main/config.ts
@@ -3,7 +3,7 @@ export const isWindows: boolean = process.platform ===
 
 export const isOsx: boolean = process.platform === 'darwin'
 export const isWindows: boolean = process.platform === 'win32'
-export const isLinux: boolean = process.platform === 'linux'
+export const isLinux: boolean = (process.platform === 'linux' || process.platform === 'freebsd')
 
 export const editorWinOptions: Readonly<BrowserWindowConstructorOptions> = Object.freeze({
   minWidth: 550,
