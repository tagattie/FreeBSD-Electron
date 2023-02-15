--- chrome/browser/ui/views/accelerator_table.cc.orig	2023-02-01 18:43:13 UTC
+++ chrome/browser/ui/views/accelerator_table.cc
@@ -64,11 +64,11 @@ const AcceleratorMapping kAcceleratorMap[] = {
     {ui::VKEY_S, ui::EF_PLATFORM_ACCELERATOR, IDC_SAVE_PAGE},
     {ui::VKEY_9, ui::EF_PLATFORM_ACCELERATOR, IDC_SELECT_LAST_TAB},
     {ui::VKEY_NUMPAD9, ui::EF_PLATFORM_ACCELERATOR, IDC_SELECT_LAST_TAB},
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
     {ui::VKEY_9, ui::EF_ALT_DOWN, IDC_SELECT_LAST_TAB},
     {ui::VKEY_NUMPAD9, ui::EF_ALT_DOWN, IDC_SELECT_LAST_TAB},
 #endif  // BUILDFLAG(IS_LINUX)
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_WIN)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_WIN) || BUILDFLAG(IS_BSD)
     {ui::VKEY_NEXT, ui::EF_CONTROL_DOWN | ui::EF_SHIFT_DOWN, IDC_MOVE_TAB_NEXT},
     {ui::VKEY_PRIOR, ui::EF_CONTROL_DOWN | ui::EF_SHIFT_DOWN,
      IDC_MOVE_TAB_PREVIOUS},
@@ -96,7 +96,7 @@ const AcceleratorMapping kAcceleratorMap[] = {
     {ui::VKEY_NUMPAD7, ui::EF_PLATFORM_ACCELERATOR, IDC_SELECT_TAB_6},
     {ui::VKEY_8, ui::EF_PLATFORM_ACCELERATOR, IDC_SELECT_TAB_7},
     {ui::VKEY_NUMPAD8, ui::EF_PLATFORM_ACCELERATOR, IDC_SELECT_TAB_7},
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
     {ui::VKEY_1, ui::EF_ALT_DOWN, IDC_SELECT_TAB_0},
     {ui::VKEY_NUMPAD1, ui::EF_ALT_DOWN, IDC_SELECT_TAB_0},
     {ui::VKEY_2, ui::EF_ALT_DOWN, IDC_SELECT_TAB_1},
@@ -141,7 +141,7 @@ const AcceleratorMapping kAcceleratorMap[] = {
      IDC_SHOW_AVATAR_MENU},
 
 // Platform-specific key maps.
-#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_FUCHSIA)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_FUCHSIA) || BUILDFLAG(IS_BSD)
     {ui::VKEY_BROWSER_BACK, ui::EF_NONE, IDC_BACK},
     {ui::VKEY_BROWSER_FORWARD, ui::EF_NONE, IDC_FORWARD},
     {ui::VKEY_BROWSER_HOME, ui::EF_NONE, IDC_HOME},
@@ -241,7 +241,7 @@ const AcceleratorMapping kAcceleratorMap[] = {
 #endif  // !BUILDFLAG(IS_CHROMEOS)
 #endif  // !BUILDFLAG(IS_MAC)
 #if BUILDFLAG(ENABLE_SCREEN_AI_SERVICE) && \
-    (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS))
+    (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS) || BUILDFLAG(IS_BSD))
     {ui::VKEY_S, ui::EF_CONTROL_DOWN | ui::EF_SHIFT_DOWN,
      IDC_RUN_SCREEN_AI_VISUAL_ANNOTATIONS},
 #endif
