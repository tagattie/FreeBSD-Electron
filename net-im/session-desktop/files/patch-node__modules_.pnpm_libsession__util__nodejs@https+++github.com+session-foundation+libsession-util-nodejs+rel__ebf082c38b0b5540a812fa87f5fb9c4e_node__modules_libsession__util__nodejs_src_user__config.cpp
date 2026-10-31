--- node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ebf082c38b0b5540a812fa87f5fb9c4e/node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2026-10-31 11:13:20 UTC
+++ node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ebf082c38b0b5540a812fa87f5fb9c4e/node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -236,7 +236,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
 }
 
 Napi::Value UserConfigWrapper::getNoteToSelfExpiry(const Napi::CallbackInfo& info) {
-    return wrapResult(info, [&] {
+    return wrapResult(info, [&] -> int64_t {
         auto nts_expiry = config.get_nts_expiry();
         if (nts_expiry) {
             return nts_expiry->count();
