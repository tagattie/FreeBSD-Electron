--- electron/atom/browser/api/atom_api_web_contents.cc.orig	2019-11-01 20:53:18 UTC
+++ electron/atom/browser/api/atom_api_web_contents.cc
@@ -101,7 +101,7 @@
 #include "ui/views/linux_ui/linux_ui.h"
 #endif
 
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
 #include "content/public/common/renderer_preferences.h"
 #include "ui/gfx/font_render_params.h"
 #endif
@@ -428,7 +428,7 @@ void WebContents::InitWithSessionAndOptions(
   auto* prefs = web_contents()->GetMutableRendererPrefs();
   prefs->accept_languages = g_browser_process->GetApplicationLocale();
 
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
   // Update font settings.
   static const base::NoDestructor<gfx::FontRenderParams> params(
       gfx::GetFontRenderParams(gfx::FontRenderParamsQuery(), nullptr));
