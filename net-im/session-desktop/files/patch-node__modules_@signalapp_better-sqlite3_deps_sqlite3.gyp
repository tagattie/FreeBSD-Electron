--- node_modules/@signalapp/better-sqlite3/deps/sqlite3.gyp.orig	2025-05-31 20:48:25 UTC
+++ node_modules/@signalapp/better-sqlite3/deps/sqlite3.gyp
@@ -106,7 +106,7 @@
         { # Linux
           'link_settings': {
             'libraries': [
-              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/signal-sqlcipher-extension/>(rust_arch)-unknown-linux-gnu/libsignal_sqlcipher_extension.a',
+              '-lsignal_sqlcipher_extension',
             ]
           }
         }],
