--- node_modules/lzma-native/liblzma-build.sh.orig	2021-01-27 11:25:28 UTC
+++ node_modules/lzma-native/liblzma-build.sh
@@ -2,5 +2,5 @@
 set -e
 
 cd "$1/liblzma"
-make
-make install
+gmake
+gmake install
