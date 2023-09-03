--- src/utils/main/ipc/mpris.ts.orig	2023-09-03 02:34:48 UTC
+++ src/utils/main/ipc/mpris.ts
@@ -122,7 +122,7 @@ export class MprisChannel implements IpcChannelInterfa
 
   @checkStarted()
   private handlePlayPauseButtonState(isPlaying: boolean) {
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
       this.buttonState['play'] = !isPlaying
       this.buttonState['pause'] = isPlaying
     } else {
