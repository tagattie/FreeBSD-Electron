--- tabby-core/src/components/appRoot.component.ts.orig	2023-02-20 10:40:49 UTC
+++ tabby-core/src/components/appRoot.component.ts
@@ -68,7 +68,7 @@ export class AppRootComponent {
     @Input() rightToolbarButtons: Command[]
     @HostBinding('class.platform-win32') platformClassWindows = process.platform === 'win32'
     @HostBinding('class.platform-darwin') platformClassMacOS = process.platform === 'darwin'
-    @HostBinding('class.platform-linux') platformClassLinux = process.platform === 'linux'
+    @HostBinding('class.platform-linux') platformClassLinux = (process.platform === 'linux' || process.platform === 'freebsd')
     @HostBinding('class.no-tabs') noTabs = true
     @ViewChildren(TabBodyComponent) tabBodies: TabBodyComponent[]
     @ViewChild('activeTransfersDropdown') activeTransfersDropdown: NgbDropdown
