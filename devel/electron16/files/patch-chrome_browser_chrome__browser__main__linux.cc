--- chrome/browser/chrome_browser_main_linux.cc.orig	2021-11-19 04:25:08 UTC
+++ chrome/browser/chrome_browser_main_linux.cc
@@ -53,7 +53,7 @@ ChromeBrowserMainPartsLinux::~ChromeBrowserMainPartsLi
 }
 
 void ChromeBrowserMainPartsLinux::PreProfileInit() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   // Needs to be called after we have chrome::DIR_USER_DATA and
   // g_browser_process.  This happens in PreCreateThreads.
   // base::GetLinuxDistro() will initialize its value if needed.
@@ -84,7 +84,7 @@ void ChromeBrowserMainPartsLinux::PreProfileInit() {
 }
 
 void ChromeBrowserMainPartsLinux::PostCreateMainMessageLoop() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   bluez::BluezDBusManager::Initialize(nullptr /* system_bus */);
 #endif
 
@@ -110,7 +110,7 @@ void ChromeBrowserMainPartsLinux::PostBrowserStart() {
 #endif
 
 void ChromeBrowserMainPartsLinux::PostDestroyThreads() {
-#if !BUILDFLAG(IS_CHROMEOS_ASH)
+#if !BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_BSD)
   bluez::BluezDBusManager::Shutdown();
   bluez::BluezDBusThreadManager::Shutdown();
 #endif
