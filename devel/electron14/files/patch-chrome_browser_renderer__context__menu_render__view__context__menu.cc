--- chrome/browser/renderer_context_menu/render_view_context_menu.cc.orig	2021-09-14 01:51:50 UTC
+++ chrome/browser/renderer_context_menu/render_view_context_menu.cc
@@ -227,7 +227,7 @@
 #include "ui/base/resource/resource_bundle.h"
 #endif
 
-#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
 #include "chrome/browser/lens/region_search/lens_region_search_controller.h"
 #endif
 
@@ -978,7 +978,7 @@ void RenderViewContextMenu::InitMenu() {
     AppendCurrentExtensionItems();
   }
 
-#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
   if (content_type_->SupportsGroup(
           ContextMenuContentType::ITEM_GROUP_LENS_REGION_SEARCH)) {
     if (IsLensRegionSearchEnabled()) {
@@ -2286,7 +2286,7 @@ bool RenderViewContextMenu::IsCommandIdEnabled(int id)
     case IDC_CHECK_SPELLING_WHILE_TYPING:
       return prefs->GetBoolean(spellcheck::prefs::kSpellCheckEnable);
 
-#if !defined(OS_MAC) && defined(OS_POSIX)
+#if !defined(OS_MAC) && !defined(OS_BSD) && defined(OS_POSIX)
     // TODO(suzhe): this should not be enabled for password fields.
     case IDC_INPUT_METHODS_MENU:
       return true;
@@ -3249,7 +3249,7 @@ void RenderViewContextMenu::ExecSearchLensForImage() {
 }
 
 void RenderViewContextMenu::ExecLensRegionSearch() {
-#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX)
+#if defined(OS_WIN) || defined(OS_CHROMEOS) || defined(OS_LINUX) || defined(OS_BSD)
   if (!lens_region_search_controller_)
     lens_region_search_controller_ =
         std::make_unique<lens::LensRegionSearchController>(
