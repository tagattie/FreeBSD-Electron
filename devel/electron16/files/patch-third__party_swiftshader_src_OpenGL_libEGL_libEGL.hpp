--- third_party/swiftshader/src/OpenGL/libEGL/libEGL.hpp.orig	2021-11-19 04:27:42 UTC
+++ third_party/swiftshader/src/OpenGL/libEGL/libEGL.hpp
@@ -100,7 +100,7 @@ class LibEGL (private)
 				#endif
 			#elif defined(__ANDROID__)
 				const char *libEGL_lib[] = {"libEGL_swiftshader.so", "libEGL_swiftshader.so"};
-			#elif defined(__linux__)
+			#elif defined(__linux__) || defined(__FreeBSD__)
 				#if defined(__LP64__)
 					const char *libEGL_lib[] = {"lib64EGL_translator.so", "libEGL.so.1", "libEGL.so", "libEGL_deprecated.so.1", "libEGL_deprecated.so"};
 				#else
