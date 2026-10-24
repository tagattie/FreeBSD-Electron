--- packages/plugin-dev/scripts/install-deps.js.orig	2026-10-24 08:59:00 UTC
+++ packages/plugin-dev/scripts/install-deps.js
@@ -47,7 +47,7 @@ function ensurePluginDeps({ log = console.log, silent 
   try {
     // Plugin build tools are devDependencies: keep them under NODE_ENV=production.
     // A shell command resolves npm.cmd on Windows; the arguments are fixed.
-    execSync('npm ci --include=dev --no-audit --no-fund', {
+    execSync('npm install --offline --include=dev --no-audit --no-fund', {
       cwd: PLUGIN_DEV_DIR,
       stdio: silent ? 'pipe' : 'inherit',
     });
