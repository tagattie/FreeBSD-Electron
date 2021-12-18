--- components/safe_browsing/content/resources/gen_file_type_proto.py.orig	2021-11-19 04:25:14 UTC
+++ components/safe_browsing/content/resources/gen_file_type_proto.py
@@ -34,6 +34,8 @@ def PlatformTypes():
         "chromeos":
         download_file_types_pb2.DownloadFileType.PLATFORM_CHROME_OS,
         "linux": download_file_types_pb2.DownloadFileType.PLATFORM_LINUX,
+        "openbsd": download_file_types_pb2.DownloadFileType.PLATFORM_LINUX,
+        "freebsd": download_file_types_pb2.DownloadFileType.PLATFORM_LINUX,
         "mac": download_file_types_pb2.DownloadFileType.PLATFORM_MAC,
         "win": download_file_types_pb2.DownloadFileType.PLATFORM_WINDOWS,
     }
@@ -178,7 +180,7 @@ class DownloadFileTypeProtoGenerator(BinaryProtoGenera
             '-t',
             '--type',
             help='The platform type. One of android, chromeos, ' +
-            'linux, mac, win')
+            'linux, mac, win, openbsd, freebsd')
 
     def AddExtraCommandLineArgsForVirtualEnvRun(self, opts, command):
         if opts.type is not None:
