--- build/linux/unbundle/replace_gn_files.py.orig	2023-01-26 11:40:09 UTC
+++ build/linux/unbundle/replace_gn_files.py
@@ -53,6 +53,7 @@ REPLACEMENTS = {
   'libjpeg': 'third_party/libjpeg.gni',
   'libjxl' : 'third_party/libjxl/BUILD.gn',
   'libpng': 'third_party/libpng/BUILD.gn',
+  'libusb': 'third_party/libusb/BUILD.gn',
   'libvpx': 'third_party/libvpx/BUILD.gn',
   'libwebp': 'third_party/libwebp/BUILD.gn',
   'libxml': 'third_party/libxml/BUILD.gn',
