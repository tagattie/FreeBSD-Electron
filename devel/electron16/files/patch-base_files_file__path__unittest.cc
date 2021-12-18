--- base/files/file_path_unittest.cc.orig	2021-11-19 04:25:04 UTC
+++ base/files/file_path_unittest.cc
@@ -1202,7 +1202,7 @@ TEST_F(FilePathTest, FromUTF8Unsafe_And_AsUTF8Unsafe) 
       "\xEF\xBC\xA1\xEF\xBC\xA2\xEF\xBC\xA3.txt" },
   };
 
-#if !defined(SYSTEM_NATIVE_UTF8) && (defined(OS_LINUX) || defined(OS_CHROMEOS))
+#if !defined(SYSTEM_NATIVE_UTF8) && (defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD))
   ScopedLocale locale("en_US.UTF-8");
 #endif
 
