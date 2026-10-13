--- node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_4a7b88f06dbdd5cdb2009d39e34d12b3/node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2026-10-13 11:36:16 UTC
+++ node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_4a7b88f06dbdd5cdb2009d39e34d12b3/node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -236,7 +236,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
 }
 
 Napi::Value UserConfigWrapper::getNoteToSelfExpiry(const Napi::CallbackInfo& info) {
-    return wrapResult(info, [&] {
+    return wrapResult(info, [&] -> int64_t {
         auto nts_expiry = config.get_nts_expiry();
         if (nts_expiry) {
             return nts_expiry->count();
