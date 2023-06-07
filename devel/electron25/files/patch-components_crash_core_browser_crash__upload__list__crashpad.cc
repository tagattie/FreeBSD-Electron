--- components/crash/core/browser/crash_upload_list_crashpad.cc.orig	2023-05-25 00:41:50 UTC
+++ components/crash/core/browser/crash_upload_list_crashpad.cc
@@ -38,7 +38,9 @@ CrashUploadListCrashpad::~CrashUploadListCrashpad() = 
 std::vector<std::unique_ptr<UploadList::UploadInfo>>
 CrashUploadListCrashpad::LoadUploadList() {
   std::vector<crash_reporter::Report> reports;
+#if !defined(OS_BSD)
   crash_reporter::GetReports(&reports);
+#endif
 
   std::vector<std::unique_ptr<UploadInfo>> uploads;
   for (const crash_reporter::Report& report : reports) {
@@ -52,9 +54,13 @@ CrashUploadListCrashpad::LoadUploadList() {
 
 void CrashUploadListCrashpad::ClearUploadList(const base::Time& begin,
                                               const base::Time& end) {
+#if !defined(OS_BSD)
   crash_reporter::ClearReportsBetween(begin, end);
+#endif
 }
 
 void CrashUploadListCrashpad::RequestSingleUpload(const std::string& local_id) {
+#if !defined(OS_BSD)
   crash_reporter::RequestSingleCrashUpload(local_id);
+#endif
 }
