--- v8/src/d8/d8.cc.orig	2021-11-19 04:27:53 UTC
+++ v8/src/d8/d8.cc
@@ -78,7 +78,7 @@
 #include "unicode/locid.h"
 #endif  // V8_INTL_SUPPORT
 
-#ifdef V8_OS_LINUX
+#if defined(V8_OS_LINUX) || defined(V8_OS_FREEBSD)
 #include <sys/mman.h>  // For MultiMappedAllocator.
 #endif
 
