--- node_modules/rollup/dist/native.js.orig	2024-07-23 21:27:35 UTC
+++ node_modules/rollup/dist/native.js
@@ -21,6 +21,10 @@ const bindingsByPlatformAndArch = {
 		s390x: { base: 'linux-s390x-gnu', musl: null },
 		x64: { base: 'linux-x64-gnu', musl: 'linux-x64-musl' }
 	},
+	freebsd: {
+		arm64: { base: 'freebsd-arm64' },
+		x64: { base: 'freebsd-x64' }
+	},
 	win32: {
 		arm64: { base: 'win32-arm64-msvc' },
 		ia32: { base: 'win32-ia32-msvc' },
