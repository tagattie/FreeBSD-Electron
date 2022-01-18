--- chrome/browser/chrome_browser_main_linux.cc.orig	2021-12-14 11:44:57 UTC
+++ chrome/browser/chrome_browser_main_linux.cc
@@ -30,7 +30,7 @@
 #include "chrome/installer/util/google_update_settings.h"
 #endif
 
-#if defined(USE_DBUS) && !defined(OS_CHROMEOS)
+#if defined(USE_DBUS) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
 #include "chrome/browser/dbus_memory_pressure_evaluator_linux.h"
 #endif
 
@@ -53,7 +53,7 @@ ChromeBrowserMainPartsLinux::~ChromeBrowserMainPartsLi
 }
 
 void ChromeBrowserMainPartsLinux::PreProfileInit() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   // Needs to be called after we have chrome::DIR_USER_DATA and
   // g_browser_process.  This happens in PreCreateThreads.
   // base::GetLinuxDistro() will initialize its value if needed.
@@ -84,14 +84,14 @@ void ChromeBrowserMainPartsLinux::PreProfileInit() {
 }
 
 void ChromeBrowserMainPartsLinux::PostCreateMainMessageLoop() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   bluez::BluezDBusManager::Initialize(nullptr /* system_bus */);
 #endif
 
   ChromeBrowserMainPartsPosix::PostCreateMainMessageLoop();
 }
 
-#if defined(USE_DBUS) && !defined(OS_CHROMEOS)
+#if defined(USE_DBUS) && !defined(OS_CHROMEOS) && !defined(OS_BSD)
 void ChromeBrowserMainPartsLinux::PostBrowserStart() {
   // static_cast is safe because this is the only implementation of
   // MemoryPressureMonitor.
@@ -110,7 +110,7 @@ void ChromeBrowserMainPartsLinux::PostBrowserStart() {
 #endif
 
 void ChromeBrowserMainPartsLinux::PostDestroyThreads() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   bluez::BluezDBusManager::Shutdown();
   bluez::BluezDBusThreadManager::Shutdown();
 #endif
