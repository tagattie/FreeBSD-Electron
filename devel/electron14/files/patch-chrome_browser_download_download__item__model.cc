--- chrome/browser/download/download_item_model.cc.orig	2021-09-14 01:51:50 UTC
+++ chrome/browser/download/download_item_model.cc
@@ -624,7 +624,7 @@ bool DownloadItemModel::IsCommandChecked(
       return download_->GetOpenWhenComplete() ||
              download_crx_util::IsExtensionDownload(*download_);
     case DownloadCommands::ALWAYS_OPEN_TYPE:
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || \
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD) || \
     defined(OS_MAC)
       if (download_commands->CanOpenPdfInSystemViewer()) {
         DownloadPrefs* prefs = DownloadPrefs::FromBrowserContext(profile());
@@ -665,7 +665,7 @@ void DownloadItemModel::ExecuteCommand(DownloadCommand
       bool is_checked = IsCommandChecked(download_commands,
                                          DownloadCommands::ALWAYS_OPEN_TYPE);
       DownloadPrefs* prefs = DownloadPrefs::FromBrowserContext(profile());
-#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || \
+#if defined(OS_WIN) || defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_BSD) || \
     defined(OS_MAC)
       if (download_commands->CanOpenPdfInSystemViewer()) {
         prefs->SetShouldOpenPdfInSystemReader(!is_checked);
