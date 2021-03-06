--- base/allocator/allocator_shim_unittest.cc.orig	2020-09-21 18:39:01 UTC
+++ base/allocator/allocator_shim_unittest.cc
@@ -355,7 +355,7 @@ TEST_F(AllocatorShimTest, InterceptLibcSymbols) {
   ASSERT_GE(aligned_allocs_intercepted_by_size[61], 1u);
 #endif  // !OS_WIN
 
-#if !defined(OS_WIN) && !defined(OS_MACOSX)
+#if !defined(OS_WIN) && !defined(OS_MACOSX) && !defined(OS_BSD)
   void* memalign_ptr = memalign(128, 53);
   ASSERT_NE(nullptr, memalign_ptr);
   ASSERT_EQ(0u, reinterpret_cast<uintptr_t>(memalign_ptr) % 128);
@@ -368,7 +368,7 @@ TEST_F(AllocatorShimTest, InterceptLibcSymbols) {
   ASSERT_GE(aligned_allocs_intercepted_by_alignment[kPageSize], 1u);
   // pvalloc rounds the size up to the next page.
   ASSERT_GE(aligned_allocs_intercepted_by_size[kPageSize], 1u);
-#endif  // !OS_WIN && !OS_MACOSX
+#endif  // !OS_WIN && !OS_MACOSX && !OS_BSD
 
   char* realloc_ptr = static_cast<char*>(malloc(10));
   strcpy(realloc_ptr, "foobar");
@@ -384,13 +384,13 @@ TEST_F(AllocatorShimTest, InterceptLibcSymbols) {
   free(zero_alloc_ptr);
   ASSERT_GE(frees_intercepted_by_addr[Hash(zero_alloc_ptr)], 1u);
 
-#if !defined(OS_WIN) && !defined(OS_MACOSX)
+#if !defined(OS_WIN) && !defined(OS_MACOSX) && !defined(OS_BSD)
   free(memalign_ptr);
   ASSERT_GE(frees_intercepted_by_addr[Hash(memalign_ptr)], 1u);
 
   free(pvalloc_ptr);
   ASSERT_GE(frees_intercepted_by_addr[Hash(pvalloc_ptr)], 1u);
-#endif  // !OS_WIN && !OS_MACOSX
+#endif  // !OS_WIN && !OS_MACOSX && !OS_BSD
 
 #if !defined(OS_WIN)
   free(posix_memalign_ptr);
@@ -557,7 +557,7 @@ static size_t GetAllocatedSize(void* ptr) {
 static size_t GetAllocatedSize(void* ptr) {
   return malloc_size(ptr);
 }
-#elif defined(OS_LINUX)
+#elif defined(OS_LINUX) || defined(OS_BSD)
 static size_t GetAllocatedSize(void* ptr) {
   return malloc_usable_size(ptr);
 }
