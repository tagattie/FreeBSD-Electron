--- node_modules/better-sqlite3/deps/sqlite3.gyp.orig	2022-01-08 06:20:49 UTC
+++ node_modules/better-sqlite3/deps/sqlite3.gyp
@@ -56,12 +56,10 @@
       'sources': ['<(SHARED_INTERMEDIATE_DIR)/sqlite3/sqlite3.c'],
       'include_dirs': [
         '<(SHARED_INTERMEDIATE_DIR)/sqlite3/',
-        '<(SHARED_INTERMEDIATE_DIR)/sqlite3/openssl-include',
       ],
       'direct_dependent_settings': {
         'include_dirs': [
           '<(SHARED_INTERMEDIATE_DIR)/sqlite3/',
-          '<(SHARED_INTERMEDIATE_DIR)/sqlite3/openssl-include',
         ],
       },
       'cflags': ['-std=c99', '-w'],
@@ -99,7 +97,7 @@
           'link_settings': {
             'libraries': [
               # This statically links libcrypto, whereas -lcrypto would dynamically link it
-              '<(SHARED_INTERMEDIATE_DIR)/sqlite3/OpenSSL-Linux/libcrypto.a'
+              '-lcrypto'
             ]
           }
         }],
