--- node_modules/.pnpm/rollup@4.12.0/node_modules/rollup/dist/native.js.orig	2024-03-02 03:57:17 UTC
+++ node_modules/.pnpm/rollup@4.12.0/node_modules/rollup/dist/native.js
@@ -19,6 +19,10 @@ const bindingsByPlatformAndArch = {
 		riscv64: { base: 'linux-riscv64-gnu', musl: null },
 		x64: { base: 'linux-x64-gnu', musl: 'linux-x64-musl' }
 	},
+	freebsd: {
+		arm64: { base: 'freebsd-arm64' },
+		x64: { base: 'freebsd-x64' }
+	},
 	win32: {
 		arm64: { base: 'win32-arm64-msvc' },
 		ia32: { base: 'win32-ia32-msvc' },
