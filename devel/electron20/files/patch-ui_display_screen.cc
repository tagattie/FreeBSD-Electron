--- ui/display/screen.cc.orig	2022-08-01 19:04:54 UTC
+++ ui/display/screen.cc
@@ -84,7 +84,7 @@ void Screen::SetDisplayForNewWindows(int64_t display_i
   display_id_for_new_windows_ = display_id;
 }
 
-#if BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 std::unique_ptr<Screen::ScreenSaverSuspender> Screen::SuspendScreenSaver() {
   SetScreenSaverSuspended(true);
   screen_saver_suspension_count_++;
