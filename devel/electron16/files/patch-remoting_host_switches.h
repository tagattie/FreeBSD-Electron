--- remoting/host/switches.h.orig	2021-10-08 06:25:54 UTC
+++ remoting/host/switches.h
@@ -35,9 +35,9 @@ extern const char kProcessTypeRdpDesktopSession[];
 extern const char kProcessTypeEvaluateCapability[];
 extern const char kProcessTypeFileChooser[];
 extern const char kProcessTypeUrlForwarderConfigurator[];
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 extern const char kProcessTypeXSessionChooser[];
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 extern const char kEvaluateCapabilitySwitchName[];
 
