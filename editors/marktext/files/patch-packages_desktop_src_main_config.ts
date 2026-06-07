--- packages/desktop/src/main/config.ts.orig	2026-06-05 03:43:05 UTC
+++ packages/desktop/src/main/config.ts
@@ -3,7 +3,7 @@ export const isWindows: boolean = process.platform ===
 
 export const isOsx: boolean = process.platform === 'darwin'
 export const isWindows: boolean = process.platform === 'win32'
-export const isLinux: boolean = process.platform === 'linux'
+export const isLinux: boolean = (process.platform === 'linux' || process.platform === 'freebsd')
 
 export const editorWinOptions: Readonly<BrowserWindowConstructorOptions> = Object.freeze({
   minWidth: 550,
