--- remoting/host/switches.cc.orig	2020-03-03 07:03:12 UTC
+++ remoting/host/switches.cc
@@ -21,9 +21,9 @@ const char kProcessTypeHost[] = "host";
 const char kProcessTypeRdpDesktopSession[] = "rdp_desktop_session";
 const char kProcessTypeEvaluateCapability[] = "evaluate_capability";
 const char kProcessTypeFileChooser[] = "file_chooser";
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
 const char kProcessTypeXSessionChooser[] = "xsession_chooser";
-#endif  // defined(OS_LINUX)
+#endif  // defined(OS_LINUX) || defined(OS_BSD)
 
 const char kEvaluateCapabilitySwitchName[] = "evaluate-type";
 
