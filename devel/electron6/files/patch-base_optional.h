--- base/optional.h.orig	2019-09-10 11:13:31 UTC
+++ base/optional.h
@@ -339,27 +339,23 @@ struct MoveAssignable<false> {
 
 // Helper to conditionally enable converting constructors and assign operators.
 template <typename T, typename U>
-struct IsConvertibleFromOptional
-    : std::integral_constant<
-          bool,
-          std::is_constructible<T, Optional<U>&>::value ||
-              std::is_constructible<T, const Optional<U>&>::value ||
-              std::is_constructible<T, Optional<U>&&>::value ||
-              std::is_constructible<T, const Optional<U>&&>::value ||
-              std::is_convertible<Optional<U>&, T>::value ||
-              std::is_convertible<const Optional<U>&, T>::value ||
-              std::is_convertible<Optional<U>&&, T>::value ||
-              std::is_convertible<const Optional<U>&&, T>::value> {};
+using IsConvertibleFromOptional =
+    disjunction<std::is_constructible<T, Optional<U>&>,
+                std::is_constructible<T, const Optional<U>&>,
+                std::is_constructible<T, Optional<U>&&>,
+                std::is_constructible<T, const Optional<U>&&>,
+                std::is_convertible<Optional<U>&, T>,
+                std::is_convertible<const Optional<U>&, T>,
+                std::is_convertible<Optional<U>&&, T>,
+                std::is_convertible<const Optional<U>&&, T>>;
 
 template <typename T, typename U>
-struct IsAssignableFromOptional
-    : std::integral_constant<
-          bool,
-          IsConvertibleFromOptional<T, U>::value ||
-              std::is_assignable<T&, Optional<U>&>::value ||
-              std::is_assignable<T&, const Optional<U>&>::value ||
-              std::is_assignable<T&, Optional<U>&&>::value ||
-              std::is_assignable<T&, const Optional<U>&&>::value> {};
+using IsAssignableFromOptional =
+    disjunction<IsConvertibleFromOptional<T, U>,
+                std::is_assignable<T&, Optional<U>&>,
+                std::is_assignable<T&, const Optional<U>&>,
+                std::is_assignable<T&, Optional<U>&&>,
+                std::is_assignable<T&, const Optional<U>&&>>;
 
 // Forward compatibility for C++17.
 // Introduce one more deeper nested namespace to avoid leaking using std::swap.
