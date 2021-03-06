--- chrome/browser/devtools/devtools_eye_dropper.cc.orig	2020-09-21 18:39:07 UTC
+++ chrome/browser/devtools/devtools_eye_dropper.cc
@@ -164,7 +164,7 @@ void DevToolsEyeDropper::UpdateCursor() {
 // magnified projection only with centered hotspot.
 // Mac Retina requires cursor to be > 120px in order to render smoothly.
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   const float kCursorSize = 63;
   const float kDiameter = 63;
   const float kHotspotOffset = 32;
