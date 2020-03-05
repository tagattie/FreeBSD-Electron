--- tools/gn/base/files/file_posix.cc.orig	2020-02-24 18:48:05 UTC
+++ tools/gn/base/files/file_posix.cc
@@ -409,7 +409,7 @@ void File::DoInitialize(const FilePath& path, uint32_t
 bool File::Flush() {
   DCHECK(IsValid());
 
-#if defined(OS_LINUX)
+#if defined(OS_LINUX) || defined(OS_BSD)
   return !HANDLE_EINTR(fdatasync(file_.get()));
 #else
   return !HANDLE_EINTR(fsync(file_.get()));
