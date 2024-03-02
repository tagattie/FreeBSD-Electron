--- node_modules/libsession_util_nodejs/src/user_config.cpp.orig	2024-03-02 22:43:10 UTC
+++ node_modules/libsession_util_nodejs/src/user_config.cpp
@@ -110,7 +110,7 @@ Napi::Value UserConfigWrapper::getNoteToSelfExpiry(con
             return nts_expiry->count();
         }
 
-        return static_cast<int64_t>(0);
+        return static_cast<long long>(0);
     });
 }
 
