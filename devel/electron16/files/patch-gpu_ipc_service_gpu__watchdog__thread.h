--- gpu/ipc/service/gpu_watchdog_thread.h.orig	2022-02-21 06:05:18 UTC
+++ gpu/ipc/service/gpu_watchdog_thread.h
@@ -192,7 +192,7 @@ class GPU_IPC_SERVICE_EXPORT GpuWatchdogThread
   bool WithinOneMinFromPowerResumed();
   bool WithinOneMinFromForegrounded();
 
-#if defined(USE_X11)
+#if defined(USE_X11) && !defined(OS_BSD)
   void UpdateActiveTTY();
 #endif
   // The watchdog continues when it's not on the TTY of our host X11 server.
@@ -264,7 +264,7 @@ class GPU_IPC_SERVICE_EXPORT GpuWatchdogThread
   bool less_than_full_thread_time_after_capped_ = false;
 #endif
 
-#if defined(USE_X11)
+#if defined(USE_X11) && !defined(OS_BSD)
   FILE* tty_file_ = nullptr;
   int host_tty_ = -1;
   int active_tty_ = -1;
