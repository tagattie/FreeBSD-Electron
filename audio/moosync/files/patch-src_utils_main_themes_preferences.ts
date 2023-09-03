--- src/utils/main/themes/preferences.ts.orig	2023-08-30 00:01:06 UTC
+++ src/utils/main/themes/preferences.ts
@@ -160,7 +160,7 @@ export async function setupSystemThemes() {
   const themes: { [key: string]: ThemeDetails } = {}
 
   const systemThemeHandler = new SystemThemeHandler()
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     const theme = await systemThemeHandler.getLinuxStyle()
     if (theme) {
       themes[theme.id] = theme
