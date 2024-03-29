--- pdf/out_of_process_instance.cc.orig	2021-11-19 04:25:20 UTC
+++ pdf/out_of_process_instance.cc
@@ -75,7 +75,7 @@
 #include "ui/gfx/geometry/size.h"
 #include "url/gurl.h"
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 #include "pdf/ppapi_migration/pdfium_font_linux.h"
 #endif
 
@@ -747,7 +747,7 @@ void OutOfProcessInstance::RotateCounterclockwise() {
 }
 
 void OutOfProcessInstance::SetLastPluginInstance() {
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   SetLastPepperInstance(this);
 #endif
 }
