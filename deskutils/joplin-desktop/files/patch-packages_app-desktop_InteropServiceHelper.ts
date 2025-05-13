--- packages/app-desktop/InteropServiceHelper.ts.orig	2025-05-12 13:42:45 UTC
+++ packages/app-desktop/InteropServiceHelper.ts
@@ -114,7 +114,7 @@ export default class InteropServiceHelper {
 							//
 							// 2025-05-03: Windows also needs the window.print() workaround.
 
-							if (shim.isLinux() || shim.isWindows()) {
+							if (shim.isLinux() || shim.isWindows() || shim.isFreeBSD()) {
 								await win.webContents.executeJavaScript(`
 									// Blocks while the print dialog is open
 									window.print();
