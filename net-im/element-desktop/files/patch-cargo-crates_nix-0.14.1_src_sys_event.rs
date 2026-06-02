--- cargo-crates/nix-0.14.1/src/sys/event.rs.orig	2026-06-02 04:27:22 UTC
+++ cargo-crates/nix-0.14.1/src/sys/event.rs
@@ -239,8 +239,9 @@ impl KEvent {
             filter: filter as type_of_event_filter,
             flags: flags.bits(),
             fflags: fflags.bits(),
-            data: data as type_of_data,
-            udata: udata as type_of_udata
+            data: data as _,
+            udata: udata as type_of_udata,
+            ext: [0; 4],
         } }
     }
 
