--- node_modules/@signalapp/better-sqlite3/deps/sqlite3.gyp.orig	2024-01-05 07:02:51 UTC
+++ node_modules/@signalapp/better-sqlite3/deps/sqlite3.gyp
@@ -105,8 +105,8 @@
           'link_settings': {
             'libraries': [
               # This statically links libcrypto, whereas -lcrypto would dynamically link it
-              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/OpenSSL-linux-<(target_arch)/libcrypto.a',
-              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/signal-tokenizer/>(rust_arch)-unknown-linux-gnu/libsignal_tokenizer.a',
+              '-lcrypto',
+              '-lsignal_tokenizer',
             ]
           }
         }],
