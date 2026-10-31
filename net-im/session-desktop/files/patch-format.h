--- node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ebf082c38b0b5540a812fa87f5fb9c4e/node_modules/libsession_util_nodejs/libsession-util/external/session-router/external/oxen-libquic/external/oxen-logging/fmt/include/fmt/format.h.orig	2026-10-31 20:13:20.414891000 +0900
+++ node_modules/.pnpm/libsession_util_nodejs@https+++github.com+session-foundation+libsession-util-nodejs+rel_ebf082c38b0b5540a812fa87f5fb9c4e/node_modules/libsession_util_nodejs/libsession-util/external/session-router/external/oxen-libquic/external/oxen-logging/fmt/include/fmt/format.h	2026-10-31 20:14:46.441054000 +0900
@@ -1943,7 +1943,10 @@
   int num_digits = 0;
   auto buffer = memory_buffer();
   switch (specs.type()) {
-  default: FMT_ASSERT(false, ""); FMT_FALLTHROUGH;
+  default:
+  case presentation_type::debug:
+  case presentation_type::string:
+    FMT_ASSERT(false, ""); FMT_FALLTHROUGH;
   case presentation_type::none:
   case presentation_type::dec:
     num_digits = count_digits(value);
@@ -2072,7 +2075,10 @@
   auto abs_value = arg.abs_value;
   auto prefix = arg.prefix;
   switch (specs.type()) {
-  default: FMT_ASSERT(false, ""); FMT_FALLTHROUGH;
+  default:
+  case presentation_type::debug:
+  case presentation_type::string:
+    FMT_ASSERT(false, ""); FMT_FALLTHROUGH;
   case presentation_type::none:
   case presentation_type::dec:
     begin = do_format_decimal(buffer, abs_value, buffer_size);
