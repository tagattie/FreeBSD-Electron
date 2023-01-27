--- components/policy/tools/generate_policy_source.py.orig	2023-01-26 11:40:13 UTC
+++ components/policy/tools/generate_policy_source.py
@@ -50,8 +50,10 @@ PLATFORM_STRINGS = {
     'fuchsia': ['fuchsia'],
     'chrome.win': ['win'],
     'chrome.linux': ['linux'],
+    'chrome.openbsd': ['openbsd'],
+    'chrome.freebsd': ['freebsd'],
     'chrome.mac': ['mac'],
-    'chrome.*': ['win', 'mac', 'linux'],
+    'chrome.*': ['win', 'mac', 'linux', 'openbsd', 'freebsd'],
     'chrome.win7': ['win'],
 }
 
