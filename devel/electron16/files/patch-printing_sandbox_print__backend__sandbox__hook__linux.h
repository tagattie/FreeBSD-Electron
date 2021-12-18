--- printing/sandbox/print_backend_sandbox_hook_linux.h.orig	2021-11-19 04:25:20 UTC
+++ printing/sandbox/print_backend_sandbox_hook_linux.h
@@ -5,8 +5,15 @@
 #ifndef PRINTING_SANDBOX_PRINT_BACKEND_SANDBOX_HOOK_LINUX_H_
 #define PRINTING_SANDBOX_PRINT_BACKEND_SANDBOX_HOOK_LINUX_H_
 
+#include "build/build_config.h"
 #include "base/component_export.h"
+#if defined(OS_OPENBSD)
+#include "sandbox/policy/openbsd/sandbox_openbsd.h"
+#elif defined(OS_FREEBSD)
+#include "sandbox/policy/freebsd/sandbox_freebsd.h"
+#else
 #include "sandbox/policy/linux/sandbox_linux.h"
+#endif
 
 namespace printing {
 
