--- ui/views/widget/desktop_aura/desktop_window_tree_host_platform.cc.orig	2024-04-15 20:34:30 UTC
+++ ui/views/widget/desktop_aura/desktop_window_tree_host_platform.cc
@@ -47,7 +47,7 @@
 #include "ui/wm/core/window_util.h"
 #include "ui/wm/public/window_move_client.h"
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 #include "ui/views/widget/desktop_aura/desktop_drag_drop_client_ozone_linux.h"
 #endif
 
@@ -272,7 +272,7 @@ void DesktopWindowTreeHostPlatform::Init(const Widget:
   if (params.type == Widget::InitParams::TYPE_WINDOW)
     GetContentWindow()->SetProperty(aura::client::kAnimationsDisabledKey, true);
 
-#if defined(USE_AURA) && (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(USE_AURA) && (BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || BUILDFLAG(IS_BSD))
   const bool requires_accelerated_widget = params.requires_accelerated_widget;
 #else
   const bool requires_accelerated_widget = false;
@@ -356,7 +356,7 @@ DesktopWindowTreeHostPlatform::CreateDragDropClient() 
 DesktopWindowTreeHostPlatform::CreateDragDropClient() {
   ui::WmDragHandler* drag_handler = ui::GetWmDragHandler(*(platform_window()));
   std::unique_ptr<DesktopDragDropClientOzone> drag_drop_client =
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
       std::make_unique<DesktopDragDropClientOzoneLinux>(window(), drag_handler);
 #else
       std::make_unique<DesktopDragDropClientOzone>(window(), drag_handler);
@@ -1117,7 +1117,7 @@ bool DesktopWindowTreeHostPlatform::RotateFocusForWidg
 // DesktopWindowTreeHost:
 
 // Linux subclasses this host and adds some Linux specific bits.
-#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_CHROMEOS)
+#if !BUILDFLAG(IS_LINUX) && !BUILDFLAG(IS_CHROMEOS) && !BUILDFLAG(IS_BSD)
 // static
 DesktopWindowTreeHost* DesktopWindowTreeHost::Create(
     internal::NativeWidgetDelegate* native_widget_delegate,
