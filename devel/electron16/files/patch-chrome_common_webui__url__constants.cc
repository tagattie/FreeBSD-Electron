--- chrome/common/webui_url_constants.cc.orig	2021-12-14 11:45:00 UTC
+++ chrome/common/webui_url_constants.cc
@@ -385,12 +385,12 @@ const char kChromeUIWebUIJsErrorHost[] = "webuijserror
 const char kChromeUIWebUIJsErrorURL[] = "chrome://webuijserror/";
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 const char kChromeUIConnectorsInternalsHost[] = "connectors-internals";
 #endif
 
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
 const char kChromeUIDiscardsHost[] = "discards";
 const char kChromeUIDiscardsURL[] = "chrome://discards/";
@@ -405,7 +405,7 @@ const char kChromeUINearbyShareURL[] = "chrome://nearb
 const char kChromeUILinuxProxyConfigHost[] = "linux-proxy-config";
 #endif
 
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || \
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD) || \
     defined(OS_ANDROID)
 const char kChromeUISandboxHost[] = "sandbox";
 #endif
@@ -413,7 +413,7 @@ const char kChromeUISandboxHost[] = "sandbox";
 // TODO(crbug.com/1052397): Revisit the macro expression once build flag switch
 // of lacros-chrome is complete.
 #if defined(OS_WIN) || defined(OS_MAC) || defined(OS_FUCHSIA) || \
-    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+    (defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS)) || defined(OS_BSD)
 const char kChromeUIBrowserSwitchHost[] = "browser-switch";
 const char kChromeUIBrowserSwitchURL[] = "chrome://browser-switch/";
 const char kChromeUIEnterpriseProfileWelcomeHost[] =
@@ -428,7 +428,7 @@ const char kChromeUIProfilePickerUrl[] = "chrome://pro
 const char kChromeUIProfilePickerStartupQuery[] = "startup";
 #endif
 
-#if ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && defined(TOOLKIT_VIEWS)) || \
+#if ((defined(OS_LINUX) || defined(OS_CHROMEOS)) && defined(TOOLKIT_VIEWS)) || defined(OS_BSD) || \
     defined(USE_AURA)
 const char kChromeUITabModalConfirmDialogHost[] = "tab-modal-confirm-dialog";
 #endif
@@ -617,18 +617,18 @@ const char* const kChromeHostURLs[] = {
     kChromeUIInternetDetailDialogHost,
     kChromeUIAssistantOptInHost,
 #endif
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
     kChromeUIConnectorsInternalsHost,
 #endif
-#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || \
+#if defined(OS_WIN) || defined(OS_MAC) || defined(OS_LINUX) || defined(OS_BSD) || \
     defined(OS_CHROMEOS)
     kChromeUIDiscardsHost,
 #endif
 #if defined(OS_POSIX) && !defined(OS_MAC) && !defined(OS_ANDROID)
     kChromeUILinuxProxyConfigHost,
 #endif
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || \
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD) || \
     defined(OS_ANDROID)
     kChromeUISandboxHost,
 #endif
