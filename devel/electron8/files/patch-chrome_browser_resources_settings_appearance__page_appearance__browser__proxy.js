--- chrome/browser/resources/settings/appearance_page/appearance_browser_proxy.js.orig	2020-03-03 07:02:34 UTC
+++ chrome/browser/resources/settings/appearance_page/appearance_browser_proxy.js
@@ -19,7 +19,7 @@ cr.define('settings', function() {
 
     useDefaultTheme() {}
 
-    // <if expr="is_linux and not chromeos">
+    // <if expr="is_bsd and not chromeos">
     useSystemTheme() {}
 
     // </if>
@@ -59,7 +59,7 @@ cr.define('settings', function() {
       chrome.send('useDefaultTheme');
     }
 
-    // <if expr="is_linux and not chromeos">
+    // <if expr="is_bsd and not chromeos">
     /** @override */
     useSystemTheme() {
       chrome.send('useSystemTheme');
