--- third_party/blink/renderer/build/scripts/rule_bison.py.orig	2019-05-05 07:23:50 UTC
+++ third_party/blink/renderer/build/scripts/rule_bison.py
@@ -44,6 +44,19 @@ import sys
 
 from blinkbuild.name_style_converter import NameStyleConverter
 
+def modify_file(path, prefix_lines, suffix_lines, replace_list=[]):
+    prefix_lines = map(lambda s: s + '\n', prefix_lines)
+    suffix_lines = map(lambda s: s + '\n', suffix_lines)
+    with open(path, 'r') as f:
+        old_lines = f.readlines()
+    for i in range(len(old_lines)):
+        for src, dest in replace_list:
+            old_lines[i] = old_lines[i].replace(src, dest)
+    new_lines = prefix_lines + old_lines + suffix_lines
+    with open(path, 'w') as f:
+        f.writelines(new_lines)
+
+
 assert len(sys.argv) == 4 or len(sys.argv) == 5
 
 inputFile = sys.argv[1]
@@ -116,3 +129,9 @@ print >>outputHFile, '#define %s' % headerGuard
 print >>outputHFile, outputHContents
 print >>outputHFile, '#endif  // %s' % headerGuard
 outputHFile.close()
+
+common_replace_list = [(inputRoot + '.hh',
+                        inputRoot + '.h')]
+modify_file(
+    outputCpp, [], [],
+    replace_list=common_replace_list)
