--- ui/aura/screen_ozone.cc.orig	2022-08-01 19:04:54 UTC
+++ ui/aura/screen_ozone.cc
@@ -107,7 +107,7 @@ display::Display ScreenOzone::GetPrimaryDisplay() cons
   return platform_screen_->GetPrimaryDisplay();
 }
 
-#if BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 bool ScreenOzone::SetScreenSaverSuspended(bool suspend) {
   return platform_screen_->SetScreenSaverSuspended(suspend);
 }
