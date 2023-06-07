--- content/utility/speech/speech_recognition_sandbox_hook_linux.h.orig	2023-05-25 00:41:55 UTC
+++ content/utility/speech/speech_recognition_sandbox_hook_linux.h
@@ -5,7 +5,11 @@
 #ifndef CONTENT_UTILITY_SPEECH_SPEECH_RECOGNITION_SANDBOX_HOOK_LINUX_H_
 #define CONTENT_UTILITY_SPEECH_SPEECH_RECOGNITION_SANDBOX_HOOK_LINUX_H_
 
+#if defined(OS_BSD)
+#include "sandbox/policy/sandbox.h"
+#else
 #include "sandbox/policy/linux/sandbox_linux.h"
+#endif
 
 namespace speech {
 
