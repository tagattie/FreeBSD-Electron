--- third_party/abseil-cpp/absl/debugging/internal/elf_mem_image.h.orig	2021-12-14 11:45:10 UTC
+++ third_party/abseil-cpp/absl/debugging/internal/elf_mem_image.h
@@ -38,7 +38,14 @@
 
 #ifdef ABSL_HAVE_ELF_MEM_IMAGE
 
+#if defined(__FreeBSD__)
+#include <elf.h>
+#ifndef ElfW
+#define ElfW(x) __ElfN(x)
+#endif
+#else
 #include <link.h>  // for ElfW
+#endif
 
 namespace absl {
 ABSL_NAMESPACE_BEGIN
