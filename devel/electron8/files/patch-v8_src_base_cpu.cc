--- v8/src/base/cpu.cc.orig	2020-03-03 07:14:39 UTC
+++ v8/src/base/cpu.cc
@@ -422,6 +422,7 @@ CPU::CPU()
 
 #if V8_OS_LINUX
 
+#if V8_OS_LINUX
   CPUInfo cpu_info;
 
   // Extract implementor from the "CPU implementer" field.
@@ -455,6 +456,7 @@ CPU::CPU()
     }
     delete[] part;
   }
+#endif
 
   // Extract architecture from the "CPU Architecture" field.
   // The list is well-known, unlike the the output of
