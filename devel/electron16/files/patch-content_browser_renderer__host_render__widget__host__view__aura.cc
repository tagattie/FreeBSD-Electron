--- content/browser/renderer_host/render_widget_host_view_aura.cc.orig	2022-02-21 07:31:20 UTC
+++ content/browser/renderer_host/render_widget_host_view_aura.cc
@@ -111,7 +111,7 @@
 #include "ui/gfx/gdi_util.h"
 #endif
 
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
 #include "content/browser/accessibility/browser_accessibility_auralinux.h"
 #include "ui/base/ime/linux/text_edit_command_auralinux.h"
 #include "ui/base/ime/linux/text_edit_key_bindings_delegate_auralinux.h"
@@ -478,7 +478,7 @@ gfx::NativeViewAccessible RenderWidgetHostViewAura::Ge
   if (manager)
     return ToBrowserAccessibilityWin(manager->GetRoot())->GetCOM();
 
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
   BrowserAccessibilityManager* manager =
       host()->GetOrCreateRootBrowserAccessibilityManager();
   if (manager && manager->GetRoot())
@@ -1520,7 +1520,7 @@ bool RenderWidgetHostViewAura::ShouldDoLearning() {
   return GetTextInputManager() && GetTextInputManager()->should_do_learning();
 }
 
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 bool RenderWidgetHostViewAura::SetCompositionFromExistingText(
     const gfx::Range& range,
     const std::vector<ui::ImeTextSpan>& ui_ime_text_spans) {
@@ -2335,7 +2335,7 @@ bool RenderWidgetHostViewAura::NeedsInputGrab() {
 }
 
 bool RenderWidgetHostViewAura::NeedsMouseCapture() {
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   return NeedsInputGrab();
 #else
   return false;
@@ -2512,7 +2512,7 @@ void RenderWidgetHostViewAura::ForwardKeyboardEventWit
   if (!target_host)
     return;
 
-#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)
+#if defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD)
   ui::TextEditKeyBindingsDelegateAuraLinux* keybinding_delegate =
       ui::GetTextEditKeyBindingsDelegate();
   std::vector<ui::TextEditCommandAuraLinux> commands;
