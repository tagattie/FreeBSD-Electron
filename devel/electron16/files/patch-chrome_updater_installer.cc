--- chrome/updater/installer.cc.orig	2021-11-19 04:25:12 UTC
+++ chrome/updater/installer.cc
@@ -256,13 +256,13 @@ absl::optional<base::FilePath> Installer::GetCurrentIn
   return path->AppendASCII(pv_.GetString());
 }
 
-#if defined(OS_LINUX) || defined(OS_CHROMEOS)
+#if defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 Installer::Result Installer::RunApplicationInstaller(
     const base::FilePath& app_installer,
     const std::string& arguments) {
   NOTREACHED();
   return Installer::Result(-1);
 }
-#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS)
+#endif  // defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD)
 
 }  // namespace updater
