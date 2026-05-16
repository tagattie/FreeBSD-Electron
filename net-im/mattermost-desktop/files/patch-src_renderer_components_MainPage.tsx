--- src/renderer/components/MainPage.tsx.orig	2026-05-05 05:14:08 UTC
+++ src/renderer/components/MainPage.tsx
@@ -502,7 +502,7 @@ class MainPage extends React.PureComponent<Props, Stat
             <BasePage
                 appName={this.props.appName}
                 openMenu={this.props.openMenu}
-                title={window.process.platform !== 'linux' && this.state.servers.length === 0 ? this.props.appName : undefined}
+                title={(window.process.platform !== 'linux' && window.process.platform !== 'freebsd') && this.state.servers.length === 0 ? this.props.appName : undefined}
                 errorState={errorState}
                 errorMessage={tabStatus?.extra?.error}
                 errorUrl={tabStatus?.extra?.url}
