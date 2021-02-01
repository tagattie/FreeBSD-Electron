--- electron/shell/browser/api/electron_api_web_contents.cc.orig	2021-01-27 19:18:22 UTC
+++ electron/shell/browser/api/electron_api_web_contents.cc
@@ -120,11 +120,11 @@
 #include "ui/base/cocoa/defaults_utils.h"
 #endif
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 #include "ui/views/linux_ui/linux_ui.h"
 #endif
 
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
 #include "ui/gfx/font_render_params.h"
 #endif
 
@@ -344,7 +344,7 @@ base::Optional<base::TimeDelta> GetCursorBlinkInterval
   base::TimeDelta interval;
   if (ui::TextInsertionCaretBlinkPeriod(&interval))
     return interval;
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   if (auto* linux_ui = views::LinuxUI::instance())
     return linux_ui->GetCursorBlinkInterval();
 #elif defined(OS_WIN)
@@ -634,7 +634,7 @@ void WebContents::InitWithSessionAndOptions(
   accept_languages.pop_back();
   prefs->accept_languages = accept_languages;
 
-#if defined(OS_LINUX) || defined(OS_WIN)
+#if defined(OS_LINUX) || defined(OS_WIN) || defined(OS_BSD)
   // Update font settings.
   static const base::NoDestructor<gfx::FontRenderParams> params(
       gfx::GetFontRenderParams(gfx::FontRenderParamsQuery(), nullptr));
