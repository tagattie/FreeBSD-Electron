--- cargo-crates/nix-0.14.1/src/sys/event.rs.orig	2019-06-03 13:01:58 UTC
+++ cargo-crates/nix-0.14.1/src/sys/event.rs
@@ -182,6 +182,7 @@ libc_bitflags!(
         NOTE_NSECONDS;
         #[cfg(target_os = "dragonfly")]
         NOTE_OOB;
+        #[cfg(not(target_os = "freebsd"))]
         NOTE_PCTRLMASK;
         NOTE_PDATAMASK;
         #[cfg(any(target_os = "macos", target_os = "ios"))]
@@ -239,8 +240,9 @@ impl KEvent {
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
 
