--- third_party/perfetto/src/tracing/platform_posix.cc.orig	2021-09-14 01:58:28 UTC
+++ third_party/perfetto/src/tracing/platform_posix.cc
@@ -18,7 +18,8 @@
 
 #if PERFETTO_BUILDFLAG(PERFETTO_OS_LINUX) ||   \
     PERFETTO_BUILDFLAG(PERFETTO_OS_ANDROID) || \
-    PERFETTO_BUILDFLAG(PERFETTO_OS_APPLE)
+    PERFETTO_BUILDFLAG(PERFETTO_OS_APPLE) ||   \
+    PERFETTO_BUILDFLAG(PERFETTO_OS_FREEBSD)
 
 #include "perfetto/ext/base/file_utils.h"
 #include "perfetto/ext/base/thread_task_runner.h"
@@ -100,7 +101,8 @@ std::string PlatformPosix::GetCurrentProcessName() {
   std::string cmdline;
   base::ReadFile("/proc/self/cmdline", &cmdline);
   return cmdline.substr(0, cmdline.find('\0'));
-#elif PERFETTO_BUILDFLAG(PERFETTO_OS_APPLE)
+#elif PERFETTO_BUILDFLAG(PERFETTO_OS_APPLE) || \
+      PERFETTO_BUILDFLAG(PERFETTO_OS_FREEBSD)
   return std::string(getprogname());
 #else
   return "unknown_producer";
@@ -116,4 +118,4 @@ Platform* Platform::GetDefaultPlatform() {
 }
 
 }  // namespace perfetto
-#endif  // OS_LINUX || OS_ANDROID || OS_APPLE
+#endif  // OS_LINUX || OS_ANDROID || OS_APPLE || OS_FREEBSD
