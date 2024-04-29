--- node_modules/.pnpm/rollup@4.14.2/node_modules/rollup/dist/native.js.orig	2024-04-29 11:35:58 UTC
+++ node_modules/.pnpm/rollup@4.14.2/node_modules/rollup/dist/native.js
@@ -13,6 +13,10 @@ const bindingsByPlatformAndArch = {
 		arm64: { base: 'darwin-arm64' },
 		x64: { base: 'darwin-x64' }
 	},
+	freebsd: {
+		arm64: { base: 'freebsd-arm64' },
+		x64: { base: 'freebsd-x64' }
+	},
 	linux: {
 		arm: { base: 'linux-arm-gnueabihf', musl: null },
 		arm64: { base: 'linux-arm64-gnu', musl: 'linux-arm64-musl' },
