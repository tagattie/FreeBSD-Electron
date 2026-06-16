--- yaneuraou/source/misc.cpp.orig	2026-06-16 19:55:00 UTC
+++ yaneuraou/source/misc.cpp
@@ -982,7 +982,7 @@ namespace SystemIO
 	{
 #if defined(_MSC_VER)
 		return _ftelli64(f);
-#elif defined(__GNUC__) && defined(IS_64BIT) && !(defined(__ANDROID__) && defined(__ANDROID_API__) && __ANDROID_API__ < 24) && !defined(__MACH__)
+#elif defined(__GNUC__) && defined(IS_64BIT) && !(defined(__ANDROID__) && defined(__ANDROID_API__) && __ANDROID_API__ < 24) && !defined(__MACH__) && !defined(__FreeBSD__)
 		return ftello64(f);
 #else
 		return ftell(f);
@@ -993,7 +993,7 @@ namespace SystemIO
 	{
 #if defined(_MSC_VER)
 		return _fseeki64(f, offset, origin);
-#elif defined(__GNUC__) && defined(IS_64BIT) && !(defined(__ANDROID__) && defined(__ANDROID_API__) && __ANDROID_API__ < 24) && !defined(__MACH__)
+#elif defined(__GNUC__) && defined(IS_64BIT) && !(defined(__ANDROID__) && defined(__ANDROID_API__) && __ANDROID_API__ < 24) && !defined(__MACH__) && !defined(__FreeBSD__)
 		return fseeko64(f, offset, origin);
 #else
 		return fseek(f, offset, origin);
