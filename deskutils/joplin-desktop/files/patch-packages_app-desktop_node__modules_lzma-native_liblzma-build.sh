--- packages/app-desktop/node_modules/lzma-native/liblzma-build.sh.orig	2021-01-24 07:53:16 UTC
+++ packages/app-desktop/node_modules/lzma-native/liblzma-build.sh
@@ -2,5 +2,5 @@
 set -e
 
 cd "$1/liblzma"
-make
-make install
+gmake
+gmake install
