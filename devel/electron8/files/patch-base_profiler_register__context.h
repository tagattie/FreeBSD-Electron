--- base/profiler/register_context.h.orig	2020-03-03 07:02:14 UTC
+++ base/profiler/register_context.h
@@ -17,7 +17,7 @@
 #include <windows.h>
 #elif defined(OS_MACOSX)
 #include <mach/machine/thread_status.h>
-#elif defined(OS_ANDROID) || defined(OS_LINUX)
+#elif defined(OS_ANDROID) || defined(OS_LINUX) || defined(OS_BSD)
 #include <sys/ucontext.h>
 #endif
 
@@ -136,6 +136,56 @@ inline uintptr_t& RegisterContextInstructionPointer(mc
 }
 
 #else  // #if defined(ARCH_CPU_ARM_FAMILY) && defined(ARCH_CPU_32_BITS)
+
+// Placeholders for other POSIX platforms that just return the first
+// three register slots in the context.
+inline uintptr_t& RegisterContextStackPointer(mcontext_t* context) {
+  return *reinterpret_cast<uintptr_t*>(context);
+}
+
+inline uintptr_t& RegisterContextFramePointer(mcontext_t* context) {
+  return *(reinterpret_cast<uintptr_t*>(context) + 1);
+}
+
+inline uintptr_t& RegisterContextInstructionPointer(mcontext_t* context) {
+  return *(reinterpret_cast<uintptr_t*>(context) + 2);
+}
+
+#endif  // #if defined(ARCH_CPU_ARM_FAMILY) && defined(ARCH_CPU_32_BITS)
+
+#elif defined(OS_BSD) // #if defined(OS_WIN)
+
+using RegisterContext = mcontext_t;
+
+#if defined(ARCH_CPU_ARM_FAMILY)
+
+inline uintptr_t& RegisterContextStackPointer(mcontext_t* context) {
+  return AsUintPtr(&context->__gregs[_REG_SP]);
+}
+
+inline uintptr_t& RegisterContextFramePointer(mcontext_t* context) {
+  return AsUintPtr(&context->__gregs[_REG_FP]);
+}
+
+inline uintptr_t& RegisterContextInstructionPointer(mcontext_t* context) {
+  return AsUintPtr(&context->__gregs[_REG_PC]);
+}
+
+#elif defined(ARCH_CPU_X86_64)  // #if defined(ARCH_CPU_ARM_FAMILY)
+
+inline uintptr_t& RegisterContextStackPointer(mcontext_t* context) {
+  return AsUintPtr(&context->mc_rsp);
+}
+
+inline uintptr_t& RegisterContextFramePointer(mcontext_t* context) {
+  return AsUintPtr(&context->mc_rbp);
+}
+
+inline uintptr_t& RegisterContextInstructionPointer(mcontext_t* context) {
+  return AsUintPtr(&context->mc_rip);
+}
+
+#else  // #if defined(ARCH_CPU_ARM_FAMILY)
 
 // Placeholders for other POSIX platforms that just return the first
 // three register slots in the context.
