--- services/resource_coordinator/memory_instrumentation/queued_request_dispatcher.cc.orig	2020-09-21 18:39:22 UTC
+++ services/resource_coordinator/memory_instrumentation/queued_request_dispatcher.cc
@@ -43,7 +43,7 @@ namespace {
 uint32_t CalculatePrivateFootprintKb(const mojom::RawOSMemDump& os_dump,
                                      uint32_t shared_resident_kb) {
   DCHECK(os_dump.platform_private_footprint);
-#if defined(OS_LINUX) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || defined(OS_ANDROID) || defined(OS_BSD)
   uint64_t rss_anon_bytes = os_dump.platform_private_footprint->rss_anon_bytes;
   uint64_t vm_swap_bytes = os_dump.platform_private_footprint->vm_swap_bytes;
   return (rss_anon_bytes + vm_swap_bytes) / 1024;
@@ -82,7 +82,7 @@ memory_instrumentation::mojom::OSMemDumpPtr CreatePubl
   os_dump->is_peak_rss_resettable = internal_os_dump.is_peak_rss_resettable;
   os_dump->private_footprint_kb =
       CalculatePrivateFootprintKb(internal_os_dump, shared_resident_kb);
-#if defined(OS_LINUX) || defined(OS_ANDROID)
+#if defined(OS_LINUX) || defined(OS_ANDROID) || defined(OS_BSD)
   os_dump->private_footprint_swap_kb =
       internal_os_dump.platform_private_footprint->vm_swap_bytes / 1024;
 #endif
