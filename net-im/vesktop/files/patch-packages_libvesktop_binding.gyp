--- packages/libvesktop/binding.gyp.orig	2025-10-26 08:32:28 UTC
+++ packages/libvesktop/binding.gyp
@@ -11,9 +11,9 @@
         "-O3"
       ],
       "libraries": [
-        "<!@(pkg-config  --libs-only-l --libs-only-other glib-2.0 gio-2.0)"
+        "<!@(pkg-config  --libs-only-l --libs-only-L --libs-only-other glib-2.0 gio-2.0)"
       ],
       "cflags_cc!": ["-fno-exceptions"],
     }
   ]
-}
\ No newline at end of file
+}
