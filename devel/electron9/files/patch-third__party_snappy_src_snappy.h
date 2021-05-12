--- third_party/snappy/src/snappy.h.orig	2021-05-12 06:58:45 UTC
+++ third_party/snappy/src/snappy.h
@@ -63,7 +63,7 @@ namespace snappy {
   // Also note that this leaves "*source" in a state that is unsuitable for
   // further operations, such as RawUncompress(). You will need to rewind
   // or recreate the source yourself before attempting any further calls.
-  bool GetUncompressedLength(Source* source, uint32* result);
+  bool GetUncompressedLength(Source* source, uint32_t* result);
 
   // ------------------------------------------------------------------------
   // Higher-level string based routines (should be sufficient for most users)
