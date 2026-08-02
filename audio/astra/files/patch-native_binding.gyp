--- native/binding.gyp.orig	2026-08-01 20:55:32 UTC
+++ native/binding.gyp
@@ -60,7 +60,7 @@
             ]
           }
         }],
-        ["OS=='linux'", {
+        ["OS=='linux' or OS=='freebsd'", {
           "cflags_cc": ["-std=c++17", "-O3", "-ffast-math", "-fPIC"],
           "ldflags": ["-Wl,-z,now"],
           "link_settings": {
