--- chrome/browser/ui/webui/settings/settings_localized_strings_provider.cc.orig	2023-02-01 18:43:13 UTC
+++ chrome/browser/ui/webui/settings/settings_localized_strings_provider.cc
@@ -122,7 +122,7 @@
 #include "chrome/browser/ui/webui/settings/chromeos/constants/routes.mojom.h"
 #endif
 
-#if BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)
+#if (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)) && !BUILDFLAG(IS_CHROMEOS_LACROS)
 #include "ui/display/screen.h"
 #endif
 
@@ -143,7 +143,7 @@
 #include "chrome/browser/ui/webui/certificate_manager_localized_strings_provider.h"
 #endif
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 #include "ui/linux/linux_ui_factory.h"
 #include "ui/ozone/public/ozone_platform.h"
 #endif
@@ -229,7 +229,7 @@ void AddCommonStrings(content::WebUIDataSource* html_s
 #endif
 
   html_source->AddBoolean("isChildAccount", profile->IsChild());
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
   bool allow_qt_theme = base::FeatureList::IsEnabled(ui::kAllowQt);
 #else
   bool allow_qt_theme = false;
@@ -378,7 +378,7 @@ void AddAppearanceStrings(content::WebUIDataSource* ht
     {"huge", IDS_SETTINGS_HUGE_FONT_SIZE},
     {"sidePanelAlignLeft", IDS_SETTINGS_SIDE_PANEL_ALIGN_LEFT},
     {"sidePanelAlignRight", IDS_SETTINGS_SIDE_PANEL_ALIGN_RIGHT},
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
     {"gtkTheme", IDS_SETTINGS_GTK_THEME},
     {"useGtkTheme", IDS_SETTINGS_USE_GTK_THEME},
     {"qtTheme", IDS_SETTINGS_QT_THEME},
@@ -388,7 +388,7 @@ void AddAppearanceStrings(content::WebUIDataSource* ht
 #else
     {"resetToDefaultTheme", IDS_SETTINGS_RESET_TO_DEFAULT_THEME},
 #endif
-#if BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)
+#if (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)) && !BUILDFLAG(IS_CHROMEOS_LACROS)
     {"showWindowDecorations", IDS_SHOW_WINDOW_DECORATIONS},
 #endif
 #if BUILDFLAG(IS_MAC)
@@ -412,7 +412,7 @@ void AddAppearanceStrings(content::WebUIDataSource* ht
 
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
-#if BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_CHROMEOS_LACROS)
+#if (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)) && !BUILDFLAG(IS_CHROMEOS_LACROS)
   bool show_custom_chrome_frame = ui::OzonePlatform::GetInstance()
                                       ->GetPlatformRuntimeProperties()
                                       .supports_server_side_window_decorations;
