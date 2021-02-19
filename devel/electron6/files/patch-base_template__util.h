--- base/template_util.h.orig	2019-09-10 11:13:31 UTC
+++ base/template_util.h
@@ -174,6 +174,50 @@ struct is_in_place_type_t<in_place_type_t<Ts...>> {
   static constexpr bool value = true;
 };
 
+// C++14 implementation of C++17's std::bool_constant.
+//
+// Reference: https://en.cppreference.com/w/cpp/types/integral_constant
+// Specification: https://wg21.link/meta.type.synop
+template <bool B>
+using bool_constant = std::integral_constant<bool, B>;
+
+// C++14 implementation of C++17's std::conjunction.
+//
+// Reference: https://en.cppreference.com/w/cpp/types/conjunction
+// Specification: https://wg21.link/meta.logical#1.itemdecl:1
+template <typename...>
+struct conjunction : std::true_type {};
+
+template <typename B1>
+struct conjunction<B1> : B1 {};
+
+template <typename B1, typename... Bn>
+struct conjunction<B1, Bn...>
+    : std::conditional_t<static_cast<bool>(B1::value), conjunction<Bn...>, B1> {
+};
+
+// C++14 implementation of C++17's std::disjunction.
+//
+// Reference: https://en.cppreference.com/w/cpp/types/disjunction
+// Specification: https://wg21.link/meta.logical#itemdecl:2
+template <typename...>
+struct disjunction : std::false_type {};
+
+template <typename B1>
+struct disjunction<B1> : B1 {};
+
+template <typename B1, typename... Bn>
+struct disjunction<B1, Bn...>
+    : std::conditional_t<static_cast<bool>(B1::value), B1, disjunction<Bn...>> {
+};
+
+// C++14 implementation of C++17's std::negation.
+//
+// Reference: https://en.cppreference.com/w/cpp/types/negation
+// Specification: https://wg21.link/meta.logical#itemdecl:3
+template <typename B>
+struct negation : bool_constant<!static_cast<bool>(B::value)> {};
+
 }  // namespace base
 
 #undef CR_USE_FALLBACKS_FOR_GCC_WITH_LIBCXX
