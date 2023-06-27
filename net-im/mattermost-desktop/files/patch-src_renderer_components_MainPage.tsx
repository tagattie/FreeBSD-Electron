--- src/renderer/components/MainPage.tsx.orig	2023-06-19 18:19:05 UTC
+++ src/renderer/components/MainPage.tsx
@@ -517,7 +517,7 @@ class MainPage extends React.PureComponent<Props, Stat
                     ref={this.topBar}
                     className={'topBar-bg'}
                 >
-                    {window.process.platform !== 'linux' && this.state.servers.length === 0 && (
+                    {(window.process.platform !== 'linux' && window.process.platform !== 'freebsd') && this.state.servers.length === 0 && (
                         <div className='app-title'>
                             {intl.formatMessage({id: 'renderer.components.mainPage.titleBar', defaultMessage: 'Mattermost'})}
                         </div>
