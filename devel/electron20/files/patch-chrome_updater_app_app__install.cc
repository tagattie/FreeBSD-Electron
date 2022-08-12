--- chrome/updater/app/app_install.cc.orig	2022-08-01 19:04:25 UTC
+++ chrome/updater/app/app_install.cc
@@ -197,7 +197,7 @@ void AppInstall::WakeCandidate() {
       update_service_internal, base::WrapRefCounted(this)));
 }
 
-#if BUILDFLAG(IS_LINUX)
+#if BUILDFLAG(IS_LINUX) || BUILDFLAG(IS_BSD)
 // TODO(crbug.com/1276114) - implement.
 void AppInstall::WakeCandidateDone() {
   NOTIMPLEMENTED();
