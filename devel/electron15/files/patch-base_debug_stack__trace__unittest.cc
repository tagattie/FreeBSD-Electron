--- base/debug/stack_trace_unittest.cc.orig	2021-09-14 01:51:47 UTC
+++ base/debug/stack_trace_unittest.cc
@@ -71,6 +71,7 @@ TEST_F(StackTraceTest, OutputToStream) {
             std::string::npos)
       << "Unable to resolve symbols.";
 
+#if !defined(OS_BSD)
   // Expect a demangled symbol.
   // Note that Windows Release builds omit the function parameters from the
   // demangled stack output, otherwise this could be "testing::UnitTest::Run()".
@@ -89,9 +90,10 @@ TEST_F(StackTraceTest, OutputToStream) {
   EXPECT_TRUE(backtrace_message.find(__func__) != std::string::npos)
       << "Expected to find " << __func__ << " in backtrace:\n"
       << backtrace_message;
+#endif
 }
 
-#if !defined(OFFICIAL_BUILD) && !defined(NO_UNWIND_TABLES)
+#if !defined(OFFICIAL_BUILD) && !defined(NO_UNWIND_TABLES) && !defined(OS_BSD)
 // Disabled in Official builds, where Link-Time Optimization can result in two
 // or fewer stack frames being available, causing the test to fail.
 TEST_F(StackTraceTest, TruncatedTrace) {
@@ -105,7 +107,7 @@ TEST_F(StackTraceTest, TruncatedTrace) {
   truncated.Addresses(&count);
   EXPECT_EQ(2u, count);
 }
-#endif  // !defined(OFFICIAL_BUILD) && !defined(NO_UNWIND_TABLES)
+#endif  // !defined(OFFICIAL_BUILD) && !defined(NO_UNWIND_TABLES) && !defined(OS_BSD)
 
 // The test is used for manual testing, e.g., to see the raw output.
 TEST_F(StackTraceTest, DebugOutputToStream) {
@@ -344,7 +346,7 @@ TEST_F(StackTraceTest, MAYBE_TraceStackFramePointers) 
 // sometimes we read fp / pc from the place that previously held
 // uninitialized value.
 // TODO(crbug.com/1132511): Enable this test on Fuchsia.
-#if defined(MEMORY_SANITIZER) || defined(OS_FUCHSIA)
+#if defined(MEMORY_SANITIZER) || defined(OS_FUCHSIA) || defined(OS_BSD)
 #define MAYBE_TraceStackFramePointersFromBuffer \
   DISABLED_TraceStackFramePointersFromBuffer
 #else
