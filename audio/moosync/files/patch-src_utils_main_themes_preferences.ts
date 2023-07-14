--- src/utils/main/themes/preferences.ts.orig	2023-07-13 00:44:19 UTC
+++ src/utils/main/themes/preferences.ts
@@ -162,7 +162,7 @@ export async function setupSystemThemes() {
   const themes: { [key: string]: ThemeDetails } = {}
 
   const systemThemeHandler = new SystemThemeHandler()
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     const theme = await systemThemeHandler.getLinuxStyle()
     if (theme) {
       themes[theme.id] = theme
