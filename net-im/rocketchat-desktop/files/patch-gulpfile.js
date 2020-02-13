--- gulpfile.js.orig	2020-02-13 07:28:46 UTC
+++ gulpfile.js
@@ -62,6 +62,13 @@ task('release:linux', () => build({
 	c: { productName: 'rocketchat' },
 }));
 
+task('release:freebsd', () => build({
+	publish: NODE_ENV === 'production' ? 'onTagOrDraft' : 'never',
+	x64: true,
+	linux: [],
+	c: { productName: 'rocketchat' },
+}));
+
 task('release:win32', () => build({
 	publish: NODE_ENV === 'production' ? 'onTagOrDraft' : 'never',
 	x64: true,
