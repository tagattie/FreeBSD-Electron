--- third_party/blink/renderer/platform/text/text_break_iterator_icu.cc.orig	2021-04-14 01:08:56 UTC
+++ third_party/blink/renderer/platform/text/text_break_iterator_icu.cc
@@ -120,11 +120,11 @@ enum TextContext { kNoContext, kPriorContext, kPrimary
 
 const int kTextBufferCapacity = 16;
 
-typedef struct {
+struct UTextWithBuffer {
   DISALLOW_NEW();
   UText text;
   UChar buffer[kTextBufferCapacity];
-} UTextWithBuffer;
+};
 
 static inline int64_t TextPinIndex(int64_t& index, int64_t limit) {
   if (index < 0)
