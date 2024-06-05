--- src/renderer/components/MainPage.tsx.orig	2024-05-16 20:45:52 UTC
+++ src/renderer/components/MainPage.tsx
@@ -509,7 +509,7 @@ class MainPage extends React.PureComponent<Props, Stat
                     ref={this.topBar}
                     className={'topBar-bg'}
                 >
-                    {window.process.platform !== 'linux' && this.state.servers.length === 0 && (
+                    {(window.process.platform !== 'linux' && window.process.platform !== 'freebsd') && this.state.servers.length === 0 && (
                         <div className='app-title'>
                             {intl.formatMessage({id: 'renderer.components.mainPage.titleBar', defaultMessage: '{appName}'}, {appName: this.props.appName})}
                         </div>
