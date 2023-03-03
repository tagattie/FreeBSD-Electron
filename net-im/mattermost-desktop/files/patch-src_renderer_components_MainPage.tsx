--- src/renderer/components/MainPage.tsx.orig	2023-03-03 01:50:42 UTC
+++ src/renderer/components/MainPage.tsx
@@ -516,7 +516,7 @@ class MainPage extends React.PureComponent<Props, Stat
                     ref={this.topBar}
                     className={'topBar-bg'}
                 >
-                    {window.process.platform !== 'linux' && this.props.teams.length === 0 && (
+                    {(window.process.platform !== 'linux' && window.process.platform !== 'freebsd') && this.props.teams.length === 0 && (
                         <div className='app-title'>
                             {intl.formatMessage({id: 'renderer.components.mainPage.titleBar', defaultMessage: 'Mattermost'})}
                         </div>
