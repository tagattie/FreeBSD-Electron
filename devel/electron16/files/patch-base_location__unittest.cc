--- base/location_unittest.cc.orig	2021-11-19 04:25:04 UTC
+++ base/location_unittest.cc
@@ -37,7 +37,7 @@ TEST(LocationTest, CurrentYieldsCorrectValue) {
   EXPECT_EQ(here.line_number(), previous_line + 1);
   EXPECT_STREQ("TestBody", here.function_name());
 #endif
-#elif defined(OFFICIAL_BUILD)
+#elif defined(OFFICIAL_BUILD) && !defined(OS_BSD)
 #error Location builtins must be supported in official builds.
 #elif BUILDFLAG(FROM_HERE_USES_LOCATION_BUILTINS)
 #error FROM_HERE requires location builtins to be supported.
