--- node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2026-01-08 13:39:45 UTC
+++ node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -240,7 +240,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
 }
 
 Napi::Value UserConfigWrapper::getNoteToSelfExpiry(const Napi::CallbackInfo& info) {
-    return wrapResult(info, [&] {
+    return wrapResult(info, [&] -> int64_t {
         auto nts_expiry = config.get_nts_expiry();
         if (nts_expiry) {
             return nts_expiry->count();
