--- ash/display/mirror_window_controller.cc.orig	2021-09-14 01:51:46 UTC
+++ ash/display/mirror_window_controller.cc
@@ -287,7 +287,11 @@ void MirrorWindowController::UpdateWindow(
                          return info.id() == iter->first;
                        }) == display_info_list.end()) {
         CloseAndDeleteHost(iter->second, true);
+#if defined(__llvm__)
+        mirroring_host_info_map_.erase(iter++);
+#else
         iter = mirroring_host_info_map_.erase(iter);
+#endif
       } else {
         ++iter;
       }
