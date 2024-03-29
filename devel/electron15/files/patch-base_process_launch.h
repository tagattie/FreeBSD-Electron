--- base/process/launch.h.orig	2021-09-14 01:51:47 UTC
+++ base/process/launch.h
@@ -191,7 +191,7 @@ struct BASE_EXPORT LaunchOptions {
   bool clear_environment = false;
 #endif  // OS_WIN || OS_POSIX || OS_FUCHSIA
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // If non-zero, start the process using clone(), using flags as provided.
   // Unlike in clone, clone_flags may not contain a custom termination signal
   // that is sent to the parent when the child dies. The termination signal will
@@ -204,7 +204,7 @@ struct BASE_EXPORT LaunchOptions {
 
   // Sets parent process death signal to SIGKILL.
   bool kill_on_parent_death = false;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 #if defined(OS_MAC)
   // Mach ports that will be accessible to the child process. These are not
@@ -416,7 +416,7 @@ BASE_EXPORT void RaiseProcessToHighPriority();
 // binary. This should not be called in production/released code.
 BASE_EXPORT LaunchOptions LaunchOptionsForTest();
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_NACL_NONSFI)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_NACL_NONSFI) || defined(OS_BSD)
 // A wrapper for clone with fork-like behavior, meaning that it returns the
 // child's pid in the parent and 0 in the child. |flags|, |ptid|, and |ctid| are
 // as in the clone system call (the CLONE_VM flag is not supported).
