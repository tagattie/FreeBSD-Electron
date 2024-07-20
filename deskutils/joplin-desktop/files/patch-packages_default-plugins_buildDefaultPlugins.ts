--- packages/default-plugins/buildDefaultPlugins.ts.orig	2024-07-06 10:12:46 UTC
+++ packages/default-plugins/buildDefaultPlugins.ts
@@ -1,7 +1,7 @@
 
 /* eslint-disable no-console */
 
-import { copy, exists, remove, readdir, mkdtemp } from 'fs-extra';
+import { copy, exists, remove, mkdtemp } from 'fs-extra';
 import { join, resolve, basename } from 'path';
 import { tmpdir } from 'os';
 import { chdir, cwd } from 'process';
@@ -10,7 +10,6 @@ import getPathToPatchFileFor from './utils/getPathToPa
 import readRepositoryJson from './utils/readRepositoryJson';
 import waitForCliInput from './utils/waitForCliInput';
 import getPathToPatchFileFor from './utils/getPathToPatchFileFor';
-import getCurrentCommitHash from './utils/getCurrentCommitHash';
 
 interface Options {
 	beforeInstall: (buildDir: string, pluginName: string)=> Promise<void>;
@@ -30,7 +29,7 @@ const buildDefaultPlugins = async (outputParentDir: st
 	};
 
 	for (const pluginId in pluginRepositoryData) {
-		const repositoryData = pluginRepositoryData[pluginId];
+		// const repositoryData = pluginRepositoryData[pluginId];
 
 		const buildDir = await mkdtemp(join(tmpdir(), 'default-plugin-build'));
 		try {
@@ -38,29 +37,29 @@ const buildDefaultPlugins = async (outputParentDir: st
 			const pluginDir = resolve(join(pluginSourcesDir, pluginId));
 
 			// Clone the repository if not done yet
-			if (!(await exists(pluginDir)) || (await readdir(pluginDir)).length === 0) {
-				logStatus(`Cloning from repository ${repositoryData.cloneUrl}`);
-				await execCommand(['git', 'clone', '--', repositoryData.cloneUrl, pluginDir]);
-				chdir(pluginDir);
-			}
+			// if (!(await exists(pluginDir)) || (await readdir(pluginDir)).length === 0) {
+			// 	logStatus(`Cloning from repository ${repositoryData.cloneUrl}`);
+			// 	await execCommand(['git', 'clone', '--', repositoryData.cloneUrl, pluginDir]);
+			// 	chdir(pluginDir);
+			// }
 
 			chdir(pluginDir);
-			const expectedCommitHash = repositoryData.commit;
+			// const expectedCommitHash = repositoryData.commit;
 
-			logStatus(`Switching to commit ${expectedCommitHash}`);
-			await execCommand(['git', 'switch', repositoryData.branch]);
+			// logStatus(`Switching to commit ${expectedCommitHash}`);
+			// await execCommand(['git', 'switch', repositoryData.branch]);
 
-			try {
-				await execCommand(['git', 'checkout', expectedCommitHash]);
-			} catch (error) {
-				logStatus(`git checkout failed with error ${error}. Fetching...`);
-				await execCommand(['git', 'fetch']);
-				await execCommand(['git', 'checkout', expectedCommitHash]);
-			}
+			// try {
+			// 	await execCommand(['git', 'checkout', expectedCommitHash]);
+			// } catch (error) {
+			// 	logStatus(`git checkout failed with error ${error}. Fetching...`);
+			// 	await execCommand(['git', 'fetch']);
+			// 	await execCommand(['git', 'checkout', expectedCommitHash]);
+			// }
 
-			if (await getCurrentCommitHash() !== expectedCommitHash) {
-				throw new Error(`Unable to checkout commit ${expectedCommitHash}`);
-			}
+			// if (await getCurrentCommitHash() !== expectedCommitHash) {
+			// 	throw new Error(`Unable to checkout commit ${expectedCommitHash}`);
+			// }
 
 			logStatus('Copying repository files...');
 			await copy(pluginDir, buildDir, {
