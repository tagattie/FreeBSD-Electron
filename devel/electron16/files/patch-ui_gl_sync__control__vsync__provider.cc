--- ui/gl/sync_control_vsync_provider.cc.orig	2021-11-19 04:25:48 UTC
+++ ui/gl/sync_control_vsync_provider.cc
@@ -11,7 +11,7 @@
 #include "base/trace_event/trace_event.h"
 #include "build/build_config.h"
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 // These constants define a reasonable range for a calculated refresh interval.
 // Calculating refreshes out of this range will be considered a fatal error.
 const int64_t kMinVsyncIntervalUs = base::Time::kMicrosecondsPerSecond / 400;
@@ -26,7 +26,7 @@ const double kRelativeIntervalDifferenceThreshold = 0.
 namespace gl {
 
 SyncControlVSyncProvider::SyncControlVSyncProvider() : gfx::VSyncProvider() {
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // On platforms where we can't get an accurate reading on the refresh
   // rate we fall back to the assumption that we're displaying 60 frames
   // per second.
@@ -48,7 +48,7 @@ bool SyncControlVSyncProvider::GetVSyncParametersIfAva
     base::TimeTicks* timebase_out,
     base::TimeDelta* interval_out) {
   TRACE_EVENT0("gpu", "SyncControlVSyncProvider::GetVSyncParameters");
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   // The actual clock used for the system time returned by glXGetSyncValuesOML
   // is unspecified. In practice, the clock used is likely to be either
   // CLOCK_REALTIME or CLOCK_MONOTONIC, so we compare the returned time to the
@@ -155,11 +155,11 @@ bool SyncControlVSyncProvider::GetVSyncParametersIfAva
   return true;
 #else
   return false;
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 }
 
 bool SyncControlVSyncProvider::SupportGetVSyncParametersIfAvailable() const {
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
   return true;
 #else
   return false;
