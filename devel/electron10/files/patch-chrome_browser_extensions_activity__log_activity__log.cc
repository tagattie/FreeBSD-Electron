--- chrome/browser/extensions/activity_log/activity_log.cc.orig	2020-09-21 18:39:07 UTC
+++ chrome/browser/extensions/activity_log/activity_log.cc
@@ -47,7 +47,11 @@
 #include "extensions/browser/extensions_browser_client.h"
 #include "extensions/common/extension.h"
 #include "extensions/common/extension_messages.h"
+#if defined(OS_BSD)
+#include <re2/re2.h>
+#else
 #include "third_party/re2/src/re2/re2.h"
+#endif
 #include "url/gurl.h"
 
 namespace constants = activity_log_constants;
