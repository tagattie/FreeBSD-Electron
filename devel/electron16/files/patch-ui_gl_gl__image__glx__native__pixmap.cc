--- ui/gl/gl_image_glx_native_pixmap.cc.orig	2021-09-14 01:52:23 UTC
+++ ui/gl/gl_image_glx_native_pixmap.cc
@@ -4,6 +4,8 @@
 
 #include "ui/gl/gl_image_glx_native_pixmap.h"
 
+#include <unistd.h>
+
 #include "base/posix/eintr_wrapper.h"
 #include "ui/gfx/buffer_types.h"
 #include "ui/gfx/linux/native_pixmap_dmabuf.h"
