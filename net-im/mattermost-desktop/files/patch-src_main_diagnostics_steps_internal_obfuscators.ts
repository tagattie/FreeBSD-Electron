--- src/main/diagnostics/steps/internal/obfuscators.ts.orig	2023-06-27 20:03:41 UTC
+++ src/main/diagnostics/steps/internal/obfuscators.ts
@@ -36,7 +36,7 @@ function maskDataInString(str: string): string {
         if (REGEX_PATH_DARWIN.test(str)) {
             maskedStr = maskedStr.replaceAll(RegExp(REGEX_PATH_DARWIN, 'gi'), MASK_PATH);
         }
-    } else if (process.platform === 'linux') {
+    } else if (process.platform === 'linux' || process.platform === 'freebsd') {
         if (REGEX_PATH_LINUX.test(str)) {
             maskedStr = maskedStr.replaceAll(RegExp(REGEX_PATH_LINUX, 'gi'), MASK_PATH);
         }
