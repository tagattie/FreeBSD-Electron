--- src/renderer/components/MainPage.tsx.orig	2025-11-18 12:31:15 UTC
+++ src/renderer/components/MainPage.tsx
@@ -493,7 +493,7 @@ class MainPage extends React.PureComponent<Props, Stat
             <BasePage
                 appName={this.props.appName}
                 openMenu={this.props.openMenu}
-                title={window.process.platform !== 'linux' && this.state.servers.length === 0 ? this.props.appName : undefined}
+                title={(window.process.platform !== 'linux' && window.process.platform !== 'freebsd') && this.state.servers.length === 0 ? this.props.appName : undefined}
                 errorState={errorState}
                 errorMessage={tabStatus?.extra?.error}
                 errorUrl={tabStatus?.extra?.url}
