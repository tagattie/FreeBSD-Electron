--- node_modules/node-sass/binding.gyp.orig	2021-03-21 10:38:44 UTC
+++ node_modules/node-sass/binding.gyp
@@ -79,11 +79,6 @@
             },
           },
         }],
-        ['OS!="win"', {
-          'cflags_cc+': [
-            '-std=c++0x'
-          ]
-        }]
       ]
     }
   ]
