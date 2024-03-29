--- chrome/browser/task_manager/sampling/task_group_sampler.h.orig	2021-09-14 01:51:51 UTC
+++ chrome/browser/task_manager/sampling/task_group_sampler.h
@@ -31,9 +31,9 @@ class TaskGroupSampler : public base::RefCountedThread
   using OnCpuRefreshCallback = base::RepeatingCallback<void(double)>;
   using OnSwappedMemRefreshCallback = base::RepeatingCallback<void(int64_t)>;
   using OnIdleWakeupsCallback = base::RepeatingCallback<void(int)>;
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   using OnOpenFdCountCallback = base::RepeatingCallback<void(int)>;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   using OnProcessPriorityCallback = base::RepeatingCallback<void(bool)>;
 
   TaskGroupSampler(
@@ -42,9 +42,9 @@ class TaskGroupSampler : public base::RefCountedThread
       const OnCpuRefreshCallback& on_cpu_refresh,
       const OnSwappedMemRefreshCallback& on_memory_refresh,
       const OnIdleWakeupsCallback& on_idle_wakeups,
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
       const OnOpenFdCountCallback& on_open_fd_count,
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
       const OnProcessPriorityCallback& on_process_priority);
 
   TaskGroupSampler(const TaskGroupSampler&) = delete;
@@ -62,9 +62,9 @@ class TaskGroupSampler : public base::RefCountedThread
   double RefreshCpuUsage();
   int64_t RefreshSwappedMem();
   int RefreshIdleWakeupsPerSecond();
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   int RefreshOpenFdCount();
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   bool RefreshProcessPriority();
 
   // The process that holds the handle that we own so that we can use it for
@@ -86,9 +86,9 @@ class TaskGroupSampler : public base::RefCountedThread
   const OnCpuRefreshCallback on_cpu_refresh_callback_;
   const OnSwappedMemRefreshCallback on_swapped_mem_refresh_callback_;
   const OnIdleWakeupsCallback on_idle_wakeups_callback_;
-#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   const OnOpenFdCountCallback on_open_fd_count_callback_;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || defined(OS_BSD)
   const OnProcessPriorityCallback on_process_priority_callback_;
 
   // To assert we're running on the correct thread.
