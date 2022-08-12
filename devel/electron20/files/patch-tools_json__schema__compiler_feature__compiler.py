--- tools/json_schema_compiler/feature_compiler.py.orig	2022-08-01 19:04:53 UTC
+++ tools/json_schema_compiler/feature_compiler.py
@@ -267,6 +267,8 @@ FEATURE_GRAMMAR = ({
                 'mac': 'Feature::MACOSX_PLATFORM',
                 'win': 'Feature::WIN_PLATFORM',
                 'fuchsia': 'Feature::FUCHSIA_PLATFORM',
+                'openbsd': 'Feature::LINUX_PLATFORM',
+                'freebsd': 'Feature::LINUX_PLATFORM',
             }
         }
     },
