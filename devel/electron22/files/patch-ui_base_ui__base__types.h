--- ui/base/ui_base_types.h.orig	2023-01-26 11:41:01 UTC
+++ ui/base/ui_base_types.h
@@ -32,7 +32,7 @@ enum WindowShowState {
   SHOW_STATE_END = 6  // The end of show state enum.
 };
 
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_BSD)
 // Specifies which edges of the window are tiled.
 //
 // Wayland can notify the application if certain edge of the window is
