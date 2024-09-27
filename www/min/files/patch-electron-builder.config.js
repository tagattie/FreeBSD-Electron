--- electron-builder.config.js.orig	2024-09-27 10:03:39 UTC
+++ electron-builder.config.js
@@ -0,0 +1,85 @@
+const config = {
+  files: [
+    '**/*',
+    '!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
+    '!**/{appveyor.yml,.travis.yml,circle.yml}',
+    '!**/node_modules/*.d.ts',
+    '!**/*.map',
+    '!**/*.md',
+    '!**/._*',
+    '!**/icons/source',
+    '!dist/app',
+    // this is copied during the build
+    '!**/icons/icon.icns',
+    // localization files are compiled and copied to dist
+    '!localization/',
+    '!scripts/',
+    // These are bundled in.
+    '!**/main',
+    // parts of modules that aren"t needed
+    '!**/node_modules/@types/',
+    '!**/node_modules/pdfjs-dist/legacy',
+    '!**/node_modules/pdfjs-dist/lib',
+    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}'
+  ],
+  linux: {
+    target: [
+      {
+        target: 'dir',
+        arch: ['x64', 'armv7l', 'ia32', 'arm64']
+      }
+    ]
+  },
+  win: {
+    target: 'dir',
+    icon: 'icons/icon256.ico'
+  },
+  mac: {
+    icon: 'icons/icon.icns',
+    target: 'dir',
+    darkModeSupport: true,
+    extendInfo: {
+      NSHumanReadableCopyright: null,
+      CFBundleDocumentTypes: [
+        {
+          CFBundleTypeName: 'HTML document',
+          CFBundleTypeRole: 'Viewer',
+          LSItemContentTypes: ['public.html']
+        },
+        {
+          CFBundleTypeName: 'XHTML document',
+          CFBundleTypeRole: 'Viewer',
+          LSItemContentTypes: ['public.xhtml']
+        }
+      ],
+      NSUserActivityTypes: ['NSUserActivityTypeBrowsingWeb'], // macOS handoff support
+      LSFileQuarantineEnabled: true // https://github.com/minbrowser/min/issues/2073
+      // need to revisit if implementing autoupdate, see https://github.com/brave/browser-laptop/issues/13817
+    }
+  },
+  directories: {
+    output: 'dist/app',
+    buildResources: 'resources'
+  },
+  protocols: [
+    {
+      name: 'HTTP link',
+      schemes: ['http', 'https']
+    },
+    {
+      name: 'File',
+      schemes: ['file']
+    }
+  ],
+  asar: false,
+  publish: null,
+  /*
+  Rebuilding native modules that use nan is currently broken for Electron 32+: https://github.com/nodejs/nan/issues/973
+  This breaks PDFJS -> canvas, which causes packaging to fail.
+  Luckily for us, we don't actually use this functionality in PDFJS, and this is the only native module in the build,
+  so we can just disable rebuilding entirely. However, we may need to find a better solution in the future.
+  */
+  npmRebuild: false
+}
+
+module.exports = config
