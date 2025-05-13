--- packages/app-desktop/gui/Sidebar/styles/index.ts.orig	2025-05-12 13:44:46 UTC
+++ packages/app-desktop/gui/Sidebar/styles/index.ts
@@ -115,7 +115,7 @@ export const StyledSpanFix = styled.span`
 // Workaround sidebar rendering bug on Linux Intel GPU.
 // https://github.com/laurent22/joplin/issues/7506
 export const StyledSpanFix = styled.span`
-	${shim.isLinux() && css`
+	${(shim.isLinux() || shim.isFreeBSD()) && css`
 		position: relative;
 	`}
 `;
