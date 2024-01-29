--- src/utils/main/ipc/mpris.ts.orig	2024-01-24 01:20:13 UTC
+++ src/utils/main/ipc/mpris.ts
@@ -144,7 +144,7 @@ export class MprisChannel implements IpcChannelInterfa
 
   @checkStarted()
   private handlePlayPauseButtonState(isPlaying: boolean) {
-    if (process.platform !== 'linux') {
+    if (process.platform !== 'linux' && process.platform !== 'freebsd') {
       this.buttonState['play'] = !isPlaying
       this.buttonState['pause'] = isPlaying
     } else {
