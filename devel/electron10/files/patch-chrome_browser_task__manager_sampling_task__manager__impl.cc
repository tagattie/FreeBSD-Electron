--- chrome/browser/task_manager/sampling/task_manager_impl.cc.orig	2020-09-21 18:39:09 UTC
+++ chrome/browser/task_manager/sampling/task_manager_impl.cc
@@ -229,11 +229,11 @@ void TaskManagerImpl::GetUSERHandles(TaskId task_id,
 }
 
 int TaskManagerImpl::GetOpenFdCount(TaskId task_id) const {
-#if defined(OS_LINUX) || defined(OS_MACOSX)
+#if defined(OS_LINUX) || defined(OS_MACOSX) || defined(OS_BSD)
   return GetTaskGroupByTaskId(task_id)->open_fd_count();
 #else
   return -1;
-#endif  // defined(OS_LINUX) || defined(OS_MACOSX)
+#endif  // defined(OS_LINUX) || defined(OS_MACOSX) || defined(OS_BSD)
 }
 
 bool TaskManagerImpl::IsTaskOnBackgroundedProcess(TaskId task_id) const {
