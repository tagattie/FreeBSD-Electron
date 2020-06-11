--- lib/auth/index.tsx.orig	2020-06-02 16:52:22 UTC
+++ lib/auth/index.tsx
@@ -75,9 +75,6 @@ export class Auth extends Component<Props> {
         <SimplenoteLogo />
         <form className="login__form" onSubmit={this.onLogin}>
           <h1>{buttonLabel}</h1>
-          {!this.state.onLine && (
-            <p className="login__auth-message is-error">Offline</p>
-          )}
           {this.props.hasInsecurePassword && (
             <p
               className="login__auth-message is-error"
@@ -155,7 +152,6 @@ export class Auth extends Component<Props> {
           <button
             id="login__login-button"
             className={submitClasses}
-            disabled={!this.state.onLine}
             onClick={isCreatingAccount ? this.onSignUp : this.onLogin}
             type="submit"
           >
