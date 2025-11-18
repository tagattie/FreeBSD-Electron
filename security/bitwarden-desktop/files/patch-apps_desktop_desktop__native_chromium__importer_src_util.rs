--- apps/desktop/desktop_native/chromium_importer/src/util.rs.orig	2025-11-18 13:23:08 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/util.rs
@@ -32,7 +32,7 @@ pub(crate) fn split_encrypted_string_and_validate<'a>(
 }
 
 /// Decrypt using AES-128 in CBC mode.
-#[cfg(any(target_os = "linux", target_os = "macos", test))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos", test))]
 pub(crate) fn decrypt_aes_128_cbc(key: &[u8], iv: &[u8], ciphertext: &[u8]) -> Result<Vec<u8>> {
     use aes::cipher::{block_padding::Pkcs7, BlockDecryptMut, KeyIvInit};
 
@@ -42,7 +42,7 @@ pub(crate) fn decrypt_aes_128_cbc(key: &[u8], iv: &[u8
 }
 
 /// Derives a PBKDF2 key from the static "saltysalt" salt with the given password and iteration count.
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 pub(crate) fn derive_saltysalt(password: &[u8], iterations: u32) -> Result<Vec<u8>> {
     use pbkdf2::{hmac::Hmac, pbkdf2};
     use sha1::Sha1;
