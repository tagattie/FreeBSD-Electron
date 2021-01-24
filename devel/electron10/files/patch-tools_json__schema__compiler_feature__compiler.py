--- tools/json_schema_compiler/feature_compiler.py.orig	2020-09-21 18:40:00 UTC
+++ tools/json_schema_compiler/feature_compiler.py
@@ -236,6 +236,7 @@ FEATURE_GRAMMAR = ({
             'enum_map': {
                 'chromeos': 'Feature::CHROMEOS_PLATFORM',
                 'linux': 'Feature::LINUX_PLATFORM',
+                'bsd': 'Feature::LINUX_PLATFORM',
                 'mac': 'Feature::MACOSX_PLATFORM',
                 'win': 'Feature::WIN_PLATFORM',
             }
