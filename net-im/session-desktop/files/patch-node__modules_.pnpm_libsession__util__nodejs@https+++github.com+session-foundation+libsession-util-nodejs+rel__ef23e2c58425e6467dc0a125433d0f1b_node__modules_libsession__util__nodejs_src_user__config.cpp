--- node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ef23e2c58425e6467dc0a125433d0f1b/node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2026-06-01 13:14:48 UTC
+++ node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ef23e2c58425e6467dc0a125433d0f1b/node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -228,7 +228,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
 }
 
 Napi::Value UserConfigWrapper::getNoteToSelfExpiry(const Napi::CallbackInfo& info) {
-    return wrapResult(info, [&] {
+    return wrapResult(info, [&] -> int64_t {
         auto nts_expiry = config.get_nts_expiry();
         if (nts_expiry) {
             return nts_expiry->count();
