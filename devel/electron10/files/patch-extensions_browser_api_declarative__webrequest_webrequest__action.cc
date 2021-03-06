--- extensions/browser/api/declarative_webrequest/webrequest_action.cc.orig	2020-09-21 18:39:17 UTC
+++ extensions/browser/api/declarative_webrequest/webrequest_action.cc
@@ -28,7 +28,11 @@
 #include "extensions/common/extension.h"
 #include "net/base/registry_controlled_domains/registry_controlled_domain.h"
 #include "net/http/http_util.h"
+#if defined(OS_BSD)
+#include <re2/re2.h>
+#else
 #include "third_party/re2/src/re2/re2.h"
+#endif
 
 using extension_web_request_api_helpers::EventResponseDelta;
 
