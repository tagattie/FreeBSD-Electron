--- net/url_request/url_request_context.cc.orig	2021-11-19 04:25:20 UTC
+++ net/url_request/url_request_context.cc
@@ -86,7 +86,7 @@ const HttpNetworkSessionContext* URLRequestContext::Ge
 
 // TODO(crbug.com/1052397): Revisit once build flag switch of lacros-chrome is
 // complete.
-#if !defined(OS_WIN) && !(defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS))
+#if !defined(OS_WIN) && !(defined(OS_LINUX) || BUILDFLAG(IS_CHROMEOS_LACROS) || defined(OS_BSD))
 std::unique_ptr<URLRequest> URLRequestContext::CreateRequest(
     const GURL& url,
     RequestPriority priority,
