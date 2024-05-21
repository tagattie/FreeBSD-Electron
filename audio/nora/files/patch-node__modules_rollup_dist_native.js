--- node_modules/rollup/dist/native.js.orig	2024-05-20 11:40:57 UTC
+++ node_modules/rollup/dist/native.js
@@ -13,6 +13,10 @@ const bindingsByPlatformAndArch = {
 		arm64: { base: 'darwin-arm64' },
 		x64: { base: 'darwin-x64' }
 	},
+	freebsd: {
+		arm64: { base: 'freebsd-arm64' },
+		x64: { base: 'freebsd-x64' }
+	},
 	linux: {
 		arm: { base: 'linux-arm-gnueabihf', musl: 'linux-arm-musleabihf' },
 		arm64: { base: 'linux-arm64-gnu', musl: 'linux-arm64-musl' },
