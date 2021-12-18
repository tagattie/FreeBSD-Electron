--- content/shell/browser/shell_browser_main_parts.cc.orig	2021-11-19 04:25:16 UTC
+++ content/shell/browser/shell_browser_main_parts.cc
@@ -61,7 +61,7 @@
 #include "ui/events/devices/x11/touch_factory_x11.h"  // nogncheck
 #endif
 
-#if defined(USE_AURA) && (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(USE_AURA) && (defined(OS_LINUX) || defined(OS_BSD) || BUILDFLAG(IS_CHROMEOS_LACROS))
 #include "ui/base/ime/init/input_method_initializer.h"
 #endif
 
@@ -149,7 +149,7 @@ void ShellBrowserMainParts::PostCreateMainMessageLoop(
 }
 
 int ShellBrowserMainParts::PreEarlyInitialization() {
-#if defined(USE_AURA) && (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if defined(USE_AURA) && (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD))
   ui::InitializeInputMethodForTesting();
 #endif
 #if defined(OS_ANDROID)
