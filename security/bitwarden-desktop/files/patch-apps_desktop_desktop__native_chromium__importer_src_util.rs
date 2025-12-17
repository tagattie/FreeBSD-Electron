--- apps/desktop/desktop_native/chromium_importer/src/util.rs.orig	2025-12-11 21:15:41 UTC
+++ apps/desktop/desktop_native/chromium_importer/src/util.rs
@@ -32,7 +32,7 @@ pub(crate) fn split_encrypted_string_and_validate<'a>(
 }
 
 /// Decrypt using AES-128 in CBC mode.
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 pub(crate) fn decrypt_aes_128_cbc(key: &[u8], iv: &[u8], ciphertext: &[u8]) -> Result<Vec<u8>> {
     use aes::cipher::{block_padding::Pkcs7, BlockDecryptMut, KeyIvInit};
 
@@ -43,7 +43,7 @@ pub(crate) fn decrypt_aes_128_cbc(key: &[u8], iv: &[u8
 
 /// Derives a PBKDF2 key from the static "saltysalt" salt with the given password and iteration
 /// count.
-#[cfg(any(target_os = "linux", target_os = "macos"))]
+#[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
 pub(crate) fn derive_saltysalt(password: &[u8], iterations: u32) -> Result<Vec<u8>> {
     use pbkdf2::{hmac::Hmac, pbkdf2};
     use sha1::Sha1;
@@ -127,7 +127,7 @@ mod tests {
         run_split_encrypted_string_and_validate_test(false, "v10EncryptMe!", &[]);
     }
 
-    #[cfg(any(target_os = "linux", target_os = "macos"))]
+    #[cfg(any(target_os = "linux", target_os = "freebsd", target_os = "macos"))]
     #[test]
     fn test_decrypt_aes_128_cbc() {
         use aes::cipher::{
