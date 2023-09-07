--- packages/app-desktop/gui/Sidebar/Sidebar.tsx.orig	2023-09-06 12:24:03 UTC
+++ packages/app-desktop/gui/Sidebar/Sidebar.tsx
@@ -43,7 +43,7 @@ const logger = Logger.create('Sidebar');
 // Workaround sidebar rendering bug on Linux Intel GPU.
 // https://github.com/laurent22/joplin/issues/7506
 const StyledSpanFix = styled.span`
-	${shim.isLinux() && css`
+	${(shim.isLinux() || shim.isFreeBSD()) && css`
 		position: relative;
 	`}
 `;
