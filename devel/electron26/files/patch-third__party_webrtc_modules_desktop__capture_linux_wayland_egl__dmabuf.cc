--- third_party/webrtc/modules/desktop_capture/linux/wayland/egl_dmabuf.cc.orig	2023-08-10 01:51:22 UTC
+++ third_party/webrtc/modules/desktop_capture/linux/wayland/egl_dmabuf.cc
@@ -10,11 +10,9 @@
 
 #include "modules/desktop_capture/linux/wayland/egl_dmabuf.h"
 
-#include <asm/ioctl.h>
 #include <dlfcn.h>
 #include <fcntl.h>
 #include <libdrm/drm_fourcc.h>
-#include <linux/types.h>
 #include <spa/param/video/format-utils.h>
 #include <unistd.h>
 #include <xf86drm.h>
