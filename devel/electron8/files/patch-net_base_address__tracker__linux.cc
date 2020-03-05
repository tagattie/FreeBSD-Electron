--- net/base/address_tracker_linux.cc.orig	2020-03-03 07:03:11 UTC
+++ net/base/address_tracker_linux.cc
@@ -22,125 +22,10 @@
 namespace net {
 namespace internal {
 
-namespace {
-
-// Some kernel functions such as wireless_send_event and rtnetlink_ifinfo_prep
-// may send spurious messages over rtnetlink. RTM_NEWLINK messages where
-// ifi_change == 0 and rta_type == IFLA_WIRELESS should be ignored.
-bool IgnoreWirelessChange(const struct ifinfomsg* msg, int length) {
-  for (const struct rtattr* attr = IFLA_RTA(msg); RTA_OK(attr, length);
-       attr = RTA_NEXT(attr, length)) {
-    if (attr->rta_type == IFLA_WIRELESS && msg->ifi_change == 0)
-      return true;
-  }
-  return false;
-}
-
-// Retrieves address from NETLINK address message.
-// Sets |really_deprecated| for IPv6 addresses with preferred lifetimes of 0.
-// Precondition: |header| must already be validated with NLMSG_OK.
-bool GetAddress(const struct nlmsghdr* header,
-                int header_length,
-                IPAddress* out,
-                bool* really_deprecated) {
-  if (really_deprecated)
-    *really_deprecated = false;
-
-  // Extract the message and update |header_length| to be the number of
-  // remaining bytes.
-  const struct ifaddrmsg* msg =
-      reinterpret_cast<const struct ifaddrmsg*>(NLMSG_DATA(header));
-  header_length -= NLMSG_HDRLEN;
-
-  size_t address_length = 0;
-  switch (msg->ifa_family) {
-    case AF_INET:
-      address_length = IPAddress::kIPv4AddressSize;
-      break;
-    case AF_INET6:
-      address_length = IPAddress::kIPv6AddressSize;
-      break;
-    default:
-      // Unknown family.
-      return false;
-  }
-  // Use IFA_ADDRESS unless IFA_LOCAL is present. This behavior here is based on
-  // getaddrinfo in glibc (check_pf.c). Judging from kernel implementation of
-  // NETLINK, IPv4 addresses have only the IFA_ADDRESS attribute, while IPv6
-  // have the IFA_LOCAL attribute.
-  uint8_t* address = NULL;
-  uint8_t* local = NULL;
-  int length = IFA_PAYLOAD(header);
-  if (length > header_length) {
-    LOG(ERROR) << "ifaddrmsg length exceeds bounds";
-    return false;
-  }
-  for (const struct rtattr* attr =
-           reinterpret_cast<const struct rtattr*>(IFA_RTA(msg));
-       RTA_OK(attr, length); attr = RTA_NEXT(attr, length)) {
-    switch (attr->rta_type) {
-      case IFA_ADDRESS:
-        if (RTA_PAYLOAD(attr) < address_length) {
-          LOG(ERROR) << "attr does not have enough bytes to read an address";
-          return false;
-        }
-        address = reinterpret_cast<uint8_t*>(RTA_DATA(attr));
-        break;
-      case IFA_LOCAL:
-        if (RTA_PAYLOAD(attr) < address_length) {
-          LOG(ERROR) << "attr does not have enough bytes to read an address";
-          return false;
-        }
-        local = reinterpret_cast<uint8_t*>(RTA_DATA(attr));
-        break;
-      case IFA_CACHEINFO: {
-        if (RTA_PAYLOAD(attr) < sizeof(struct ifa_cacheinfo)) {
-          LOG(ERROR)
-              << "attr does not have enough bytes to read an ifa_cacheinfo";
-          return false;
-        }
-        const struct ifa_cacheinfo* cache_info =
-            reinterpret_cast<const struct ifa_cacheinfo*>(RTA_DATA(attr));
-        if (really_deprecated)
-          *really_deprecated = (cache_info->ifa_prefered == 0);
-      } break;
-      default:
-        break;
-    }
-  }
-  if (local)
-    address = local;
-  if (!address)
-    return false;
-  *out = IPAddress(address, address_length);
-  return true;
-}
-
-// SafelyCastNetlinkMsgData<T> performs a bounds check before casting |header|'s
-// data to a |T*|. When the bounds check fails, returns nullptr.
-template <typename T>
-T* SafelyCastNetlinkMsgData(const struct nlmsghdr* header, int length) {
-  DCHECK(NLMSG_OK(header, static_cast<__u32>(length)));
-  if (length <= 0 || static_cast<size_t>(length) < NLMSG_HDRLEN + sizeof(T))
-    return nullptr;
-  return reinterpret_cast<const T*>(NLMSG_DATA(header));
-}
-
-}  // namespace
-
 // static
 char* AddressTrackerLinux::GetInterfaceName(int interface_index, char* buf) {
-  memset(buf, 0, IFNAMSIZ);
-  base::ScopedFD ioctl_socket = GetSocketForIoctl();
-  if (!ioctl_socket.is_valid())
-    return buf;
-
-  struct ifreq ifr = {};
-  ifr.ifr_ifindex = interface_index;
-
-  if (ioctl(ioctl_socket.get(), SIOCGIFNAME, &ifr) == 0)
-    strncpy(buf, ifr.ifr_name, IFNAMSIZ - 1);
-  return buf;
+  NOTIMPLEMENTED();
+  return NULL;
 }
 
 AddressTrackerLinux::AddressTrackerLinux()
@@ -177,6 +62,7 @@ AddressTrackerLinux::AddressTrackerLinux(
 AddressTrackerLinux::~AddressTrackerLinux() = default;
 
 void AddressTrackerLinux::Init() {
+#if !defined(OS_FREEBSD)
   netlink_fd_.reset(socket(AF_NETLINK, SOCK_RAW, NETLINK_ROUTE));
   if (!netlink_fd_.is_valid()) {
     PLOG(ERROR) << "Could not create NETLINK socket";
@@ -272,6 +158,7 @@ void AddressTrackerLinux::AbortAndForceOnline() {
   connection_type_initialized_cv_.Broadcast();
 }
 
+#if !defined(OS_BSD)
 AddressTrackerLinux::AddressMap AddressTrackerLinux::GetAddressMap() const {
   AddressTrackerAutoLock lock(*this, address_map_lock_);
   return address_map_;
@@ -290,6 +177,7 @@ bool AddressTrackerLinux::IsInterfaceIgnored(int inter
   const char* interface_name = get_interface_name_(interface_index, buf);
   return ignored_interfaces_.find(interface_name) != ignored_interfaces_.end();
 }
+#endif // !OS_BSD
 
 NetworkChangeNotifier::ConnectionType
 AddressTrackerLinux::GetCurrentConnectionType() {
@@ -348,6 +236,7 @@ void AddressTrackerLinux::HandleMessage(const char* bu
                                         bool* address_changed,
                                         bool* link_changed,
                                         bool* tunnel_changed) {
+#if !defined(OS_FREEBSD)
   DCHECK(buffer);
   // Note that NLMSG_NEXT decrements |length| to reflect the number of bytes
   // remaining in |buffer|.
@@ -460,6 +349,10 @@ void AddressTrackerLinux::HandleMessage(const char* bu
         break;
     }
   }
+#else  // !OS_FREEBSD
+  NOTIMPLEMENTED();
+  AbortAndForceOnline();
+#endif // !OS_FREEBSD
 }
 
 void AddressTrackerLinux::OnFileCanReadWithoutBlocking() {
@@ -487,31 +380,7 @@ bool AddressTrackerLinux::IsTunnelInterfaceName(const 
 }
 
 void AddressTrackerLinux::UpdateCurrentConnectionType() {
-  AddressTrackerLinux::AddressMap address_map = GetAddressMap();
-  std::unordered_set<int> online_links = GetOnlineLinks();
-
-  // Strip out tunnel interfaces from online_links
-  for (auto it = online_links.cbegin(); it != online_links.cend();) {
-    if (IsTunnelInterface(*it)) {
-      it = online_links.erase(it);
-    } else {
-      ++it;
-    }
-  }
-
-  NetworkInterfaceList networks;
-  NetworkChangeNotifier::ConnectionType type =
-      NetworkChangeNotifier::CONNECTION_NONE;
-  if (GetNetworkListImpl(&networks, 0, online_links, address_map,
-                         get_interface_name_)) {
-    type = NetworkChangeNotifier::ConnectionTypeFromInterfaceList(networks);
-  } else {
-    type = online_links.empty() ? NetworkChangeNotifier::CONNECTION_NONE
-                                : NetworkChangeNotifier::CONNECTION_UNKNOWN;
-  }
-
-  AddressTrackerAutoLock lock(*this, connection_type_lock_);
-  current_connection_type_ = type;
+  NOTIMPLEMENTED();
 }
 
 int AddressTrackerLinux::GetThreadsWaitingForConnectionTypeInitForTesting() {
