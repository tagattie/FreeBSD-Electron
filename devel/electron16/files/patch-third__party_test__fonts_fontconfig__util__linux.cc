--- third_party/test_fonts/fontconfig_util_linux.cc.orig	2021-12-14 11:45:38 UTC
+++ third_party/test_fonts/fontconfig_util_linux.cc
@@ -12,11 +12,24 @@
 #include <climits>
 #include <string>
 
+#include "build/build_config.h"
+
+#if defined(OS_FREEBSD)
+#include <sys/types.h>
+#include <sys/sysctl.h>
+#endif
+
 namespace test_fonts {
 
 std::string GetSysrootDir() {
   char buf[PATH_MAX + 1];
+#if defined(OS_FREEBSD)
+  int mib[] = {CTL_KERN, KERN_PROC, KERN_PROC_PATHNAME, -1};
+  size_t count = sizeof(buf);
+  assert(sysctl(mib, 4, buf, &count, NULL, 0) == 0);
+#else
   auto count = readlink("/proc/self/exe", buf, PATH_MAX);
+#endif
   assert(count > 0);
   buf[count] = '\0';
   return dirname(buf);
@@ -24,6 +37,9 @@ std::string GetSysrootDir() {
 
 void SetUpFontconfig() {
   auto sysroot = GetSysrootDir();
+#if defined(OS_FREEBSD)
+  setenv("FONTCONFIG_FILE", "/etc/fonts/fonts.conf", 1);
+#endif
   setenv("FONTCONFIG_SYSROOT", sysroot.c_str(), 1);
 }
 
