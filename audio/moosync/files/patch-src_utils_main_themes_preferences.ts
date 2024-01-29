--- src/utils/main/themes/preferences.ts.orig	2024-01-24 01:20:13 UTC
+++ src/utils/main/themes/preferences.ts
@@ -162,7 +162,7 @@ export async function setupSystemThemes() {
 
   const systemThemeHandler = new SystemThemeHandler()
   try {
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       const theme = await systemThemeHandler.getLinuxStyle()
       if (theme) {
         themes[theme.id] = theme
