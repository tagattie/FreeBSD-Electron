--- native/binding.gyp.orig	2026-07-11 07:28:21 UTC
+++ native/binding.gyp
@@ -52,7 +52,7 @@
             ]
           }
         }],
-        ["OS=='linux'", {
+        ["OS=='linux' or OS=='freebsd'", {
           "cflags_cc": ["-std=c++17", "-O3", "-ffast-math", "-fPIC"],
           "ldflags": ["-Wl,-z,now"],
           "link_settings": {
