--- ui/ozone/public/platform_screen.cc.orig	2023-01-21 08:37:04 UTC
+++ ui/ozone/public/platform_screen.cc
@@ -30,9 +30,13 @@ std::string PlatformScreen::GetCurrentWorkspace() {
   return {};
 }
 
-bool PlatformScreen::SetScreenSaverSuspended(bool suspend) {
+PlatformScreen::PlatformScreenSaverSuspender::~PlatformScreenSaverSuspender() =
+    default;
+
+std::unique_ptr<PlatformScreen::PlatformScreenSaverSuspender>
+PlatformScreen::SuspendScreenSaver() {
   NOTIMPLEMENTED_LOG_ONCE();
-  return false;
+  return nullptr;
 }
 
 bool PlatformScreen::IsScreenSaverActive() const {
