--- content/utility/speech/speech_recognition_sandbox_hook_linux.h.orig	2021-11-19 04:25:17 UTC
+++ content/utility/speech/speech_recognition_sandbox_hook_linux.h
@@ -5,7 +5,13 @@
 #ifndef CONTENT_UTILITY_SPEECH_SPEECH_RECOGNITION_SANDBOX_HOOK_LINUX_H_
 #define CONTENT_UTILITY_SPEECH_SPEECH_RECOGNITION_SANDBOX_HOOK_LINUX_H_
 
+#if defined(OS_OPENBSD)
+#include "sandbox/policy/openbsd/sandbox_openbsd.h"
+#elif defined(OS_FREEBSD)
+#include "sandbox/policy/freebsd/sandbox_freebsd.h"
+#else
 #include "sandbox/policy/linux/sandbox_linux.h"
+#endif
 
 namespace speech {
 
