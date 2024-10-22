PORTNAME=	waveterm
DISTVERSIONPREFIX=	v
DISTVERSION=	0.8.12
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Open-source, cross-platform terminal for seamless workflows
WWW=		https://www.waveterm.dev/

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder-devel \
		task:devel/task

USES=		cargo electron:32 go:1.22,modules,no_targets nodejs:20,build

USE_GITHUB=	yes
GH_ACCOUNT=	wavetermdev
GH_TUPLE=	\
		alexflint:go-filemutex:v1.3.0:alexflint_go_filemutex/vendor/github.com/alexflint/go-filemutex \
		ebitengine:purego:v0.8.0:ebitengine_purego/vendor/github.com/ebitengine/purego \
		felixge:httpsnoop:v1.0.4:felixge_httpsnoop/vendor/github.com/felixge/httpsnoop \
		fsnotify:fsnotify:v1.7.0:fsnotify_fsnotify/vendor/github.com/fsnotify/fsnotify \
		go-ole:go-ole:v1.2.6:go_ole_go_ole/vendor/github.com/go-ole/go-ole \
		golang-jwt:jwt:v5.2.1:golang_jwt_jwt_v5/vendor/github.com/golang-jwt/jwt/v5 \
		golang-migrate:migrate:v4.18.1:golang_migrate_migrate_v4/vendor/github.com/golang-migrate/migrate/v4 \
		golang:crypto:v0.28.0:golang_crypto/vendor/golang.org/x/crypto \
		golang:net:v0.29.0:golang_net/vendor/golang.org/x/net \
		golang:sys:v0.26.0:golang_sys/vendor/golang.org/x/sys \
		golang:term:v0.25.0:golang_term/vendor/golang.org/x/term \
		google:uuid:v1.6.0:google_uuid/vendor/github.com/google/uuid \
		gorilla:handlers:v1.5.2:gorilla_handlers/vendor/github.com/gorilla/handlers \
		gorilla:mux:v1.8.1:gorilla_mux/vendor/github.com/gorilla/mux \
		gorilla:websocket:v1.5.3:gorilla_websocket/vendor/github.com/gorilla/websocket \
		hashicorp:errwrap:v1.1.0:hashicorp_errwrap/vendor/github.com/hashicorp/errwrap \
		hashicorp:go-multierror:v1.1.1:hashicorp_go_multierror/vendor/github.com/hashicorp/go-multierror \
		inconshreveable:mousetrap:v1.1.0:inconshreveable_mousetrap/vendor/github.com/inconshreveable/mousetrap \
		jmoiron:sqlx:v1.4.0:jmoiron_sqlx/vendor/github.com/jmoiron/sqlx \
		lufia:plan9stats:39d0f177ccd0:lufia_plan9stats/vendor/github.com/lufia/plan9stats \
		mattn:go-sqlite3:v1.14.24:mattn_go_sqlite3/vendor/github.com/mattn/go-sqlite3 \
		mitchellh:mapstructure:v1.5.0:mitchellh_mapstructure/vendor/github.com/mitchellh/mapstructure \
		photostorm:pty:31354506054b:photostorm_pty/vendor/github.com/creack/pty \
		power-devops:perfstat:5aafc221ea8c:power_devops_perfstat/vendor/github.com/power-devops/perfstat \
		sashabaranov:go-openai:v1.32.0:sashabaranov_go_openai/vendor/github.com/sashabaranov/go-openai \
		sawka:txwrap:v0.2.0:sawka_txwrap/vendor/github.com/sawka/txwrap \
		shirou:gopsutil:v4.24.9:shirou_gopsutil_v4/vendor/github.com/shirou/gopsutil/v4 \
		skeema:knownhosts:v1.3.0:skeema_knownhosts/vendor/github.com/skeema/knownhosts \
		spf13:cobra:v1.8.1:spf13_cobra/vendor/github.com/spf13/cobra \
		spf13:pflag:v1.0.5:spf13_pflag/vendor/github.com/spf13/pflag \
		tklauser:go-sysconf:v0.3.12:tklauser_go_sysconf/vendor/github.com/tklauser/go-sysconf \
		tklauser:numcpus:v0.6.1:tklauser_numcpus/vendor/github.com/tklauser/numcpus \
		uber-go:atomic:v1.7.0:uber_go_atomic/vendor/go.uber.org/atomic \
		wavetermdev:htmltoken:v0.1.0:wavetermdev_htmltoken/vendor/github.com/wavetermdev/htmltoken \
		wavetermdev:ssh_config:17e2087ebde2:wavetermdev_ssh_config/vendor/github.com/kevinburke/ssh_config \
		yusufpapurcu:wmi:v1.2.4:yusufpapurcu_wmi/vendor/github.com/yusufpapurcu/wmi
GH_TUPLE+=	rollup:rollup:v4.22.4:rollup/rollup
GH_TUPLE+=	swc-project:swc:v1.7.28:swc/swc

CARGO_CARGOTOML_ROLLUP=	${WRKSRC}/rollup/rust/Cargo.toml
CARGO_CARGOLOCK_ROLLUP=	${WRKSRC}/rollup/rust/Cargo.lock
CARGO_CARGOTOML_SWC=	${WRKSRC}/swc/bindings/Cargo.toml
CARGO_CARGOLOCK_SWC=	${WRKSRC}/swc/bindings/Cargo.lock
CARGO_CARGOTOML=	${CARGO_CARGOTOML_ROLLUP}
CARGO_CARGOLOCK=	${CARGO_CARGOLOCK_ROLLUP}
CARGO_CARGOLOCKS=	${CARGO_CARGOLOCK_ROLLUP} \
			${CARGO_CARGOLOCK_SWC}
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PLIST_SUB=	ARCH=${ARCH:S/aarch64/arm64/:S/amd64/x64/} \
		DISTVERSION=${DISTVERSION}
PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn4 prefetch extract rebuild:electron build:builder

ELECTRON_MAKE_FLAGS=	-c electron-builder.config.cjs

post-configure:
	@${ECHO_MSG} "===>   Updating Cargo.lock for ${CARGO_CARGOTOML_SWC}"
	@${CARGO_CARGO_RUN} update --manifest-path ${CARGO_CARGOTOML_SWC} \
		--verbose --verbose ${CARGO_UPDATE_ARGS}

pre-build:
	cd ${WRKSRC}/rollup/rust && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build \
		--manifest-path ${CARGO_CARGOTOML_ROLLUP} --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/${CARGO_BUILD_TARGET}/release/libbindings_napi.so \
		${WRKSRC}/node_modules/rollup/dist/rollup.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC}/swc/bindings && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} CARGO_FEATURE_LOCAL_DYNAMIC_TLS=1 \
		${CARGO} build --manifest-path ${CARGO_CARGOTOML_SWC} \
		--package binding_core_node --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/${CARGO_BUILD_TARGET}/release/libbinding_core_node.so \
		${WRKSRC}/node_modules/@swc/core/swc.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${GO_ENV} task --verbose build:backend
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build:prod
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/make/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

#
# targets for port maintainer(s)
#
cargo-crates-from-multiple-lockfiles:
	@for lf in ${CARGO_CARGOLOCKS}; do \
		${_CARGO_AWK} ${SCRIPTSDIR}/cargo-crates.awk $${lf}; \
	done | \
	${SED} -E 's/^CARGO_CRATES=\t+/\t\t/; s/ \\$$//' | \
	${SORT} | \
	uniq | \
	${SED} -e '1s/^\t\t/CARGO_CRATES=\t/; s/$$/ \\/' | \
	${SED} -e '$$s/ \\//'

.include <bsd.port.mk>
