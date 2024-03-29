--- chrome/browser/platform_util_linux.cc.orig	2022-08-01 19:04:22 UTC
+++ chrome/browser/platform_util_linux.cc
@@ -294,7 +294,9 @@ void RunCommand(const std::string& command,
 
   base::LaunchOptions options;
   options.current_directory = working_directory;
+#if !defined(OS_BSD)
   options.allow_new_privs = true;
+#endif
   // xdg-open can fall back on mailcap which eventually might plumb through
   // to a command that needs a terminal.  Set the environment variable telling
   // it that we definitely don't have a terminal available and that it should
