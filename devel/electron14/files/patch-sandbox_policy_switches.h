--- sandbox/policy/switches.h.orig	2021-09-14 01:52:00 UTC
+++ sandbox/policy/switches.h
@@ -69,7 +69,7 @@ SANDBOX_POLICY_EXPORT extern const char kDisableSetuid
 SANDBOX_POLICY_EXPORT extern const char kGpuSandboxAllowSysVShm[];
 SANDBOX_POLICY_EXPORT extern const char kGpuSandboxFailuresFatal[];
 SANDBOX_POLICY_EXPORT extern const char kNoSandbox[];
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 SANDBOX_POLICY_EXPORT extern const char kNoZygoteSandbox[];
 #endif
 #if defined(OS_WIN)
