--- base/atomicops.h.orig	2022-05-11 07:16:46 UTC
+++ base/atomicops.h
@@ -57,7 +57,11 @@ typedef intptr_t Atomic64;
 
 // Use AtomicWord for a machine-sized pointer.  It will use the Atomic32 or
 // Atomic64 routines below, depending on your architecture.
+#if !defined(OS_OPENBSD) && defined(__i386__)
+typedef Atomic32 AtomicWord;
+#else
 typedef intptr_t AtomicWord;
+#endif
 
 // Atomically execute:
 //      result = *ptr;
