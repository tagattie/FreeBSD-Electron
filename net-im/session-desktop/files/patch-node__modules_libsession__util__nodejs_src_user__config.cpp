--- node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2025-05-31 19:59:50 UTC
+++ node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -141,7 +141,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
 }
 
 Napi::Value UserConfigWrapper::getNoteToSelfExpiry(const Napi::CallbackInfo& info) {
-    return wrapResult(info, [&] {
+    return wrapResult(info, [&] -> int64_t {
         auto nts_expiry = config.get_nts_expiry();
         if (nts_expiry) {
             return nts_expiry->count();
