--- native/binding.gyp.orig	2026-10-04 19:13:25 UTC
+++ native/binding.gyp
@@ -224,7 +224,7 @@
             ]
           }
         }],
-        ["OS=='linux'", {
+        ["OS=='linux' or OS=='freebsd'", {
           "cflags_cc": ["-std=c++17", "-O3", "-ffast-math", "-fPIC"],
           "ldflags": ["-Wl,-z,now"],
           "link_settings": {
