--- ui/gl/gl_image_glx_native_pixmap.cc.orig	2022-08-01 19:04:54 UTC
+++ ui/gl/gl_image_glx_native_pixmap.cc
@@ -17,6 +17,8 @@
 #include "ui/gl/buffer_format_utils.h"
 #include "ui/gl/gl_bindings.h"
 
+#include <unistd.h>
+
 namespace gl {
 
 namespace {
