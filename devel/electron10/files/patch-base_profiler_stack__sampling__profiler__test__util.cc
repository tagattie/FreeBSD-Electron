--- base/profiler/stack_sampling_profiler_test_util.cc.orig	2020-09-21 18:39:01 UTC
+++ base/profiler/stack_sampling_profiler_test_util.cc
@@ -30,7 +30,7 @@
 // Fortunately, it provides _alloca, which functions identically.
 #include <malloc.h>
 #define alloca _alloca
-#else
+#elif !defined(OS_BSD)
 #include <alloca.h>
 #endif
 
