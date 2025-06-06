# Notes for port maintainer
#
# Before copying package.json and yarn.lock to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ corepack yarn add --dev --mode=skip-build node-addon-api node-gyp

PORTNAME=	waveterm
DISTVERSIONPREFIX=	v
DISTVERSION=	0.10.4
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Open-source, cross-platform terminal for seamless workflows
WWW=		https://www.waveterm.dev/

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	task:devel/task
LIB_DEPENDS=	libvips.so:graphics/vips

USES=		cargo electron:33 gmake go:1.23,modules,no_targets \
		nodejs:20,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	wavetermdev
GH_TUPLE=	\
		alexflint:go-filemutex:v1.3.0:alexflint_go_filemutex/vendor/github.com/alexflint/go-filemutex \
		ebitengine:purego:v0.8.1:ebitengine_purego/vendor/github.com/ebitengine/purego \
		felixge:httpsnoop:v1.0.4:felixge_httpsnoop/vendor/github.com/felixge/httpsnoop \
		fsnotify:fsnotify:v1.8.0:fsnotify_fsnotify/vendor/github.com/fsnotify/fsnotify \
		go-ole:go-ole:v1.2.6:go_ole_go_ole/vendor/github.com/go-ole/go-ole \
		golang-jwt:jwt:v5.2.1:golang_jwt_jwt_v5/vendor/github.com/golang-jwt/jwt/v5 \
		golang-migrate:migrate:v4.18.1:golang_migrate_migrate_v4/vendor/github.com/golang-migrate/migrate/v4 \
		golang:crypto:v0.31.0:golang_crypto/vendor/golang.org/x/crypto \
		golang:net:v0.33.0:golang_net/vendor/golang.org/x/net \
		golang:sys:v0.28.0:golang_sys/vendor/golang.org/x/sys \
		golang:term:v0.27.0:golang_term/vendor/golang.org/x/term \
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
		sashabaranov:go-openai:v1.36.0:sashabaranov_go_openai/vendor/github.com/sashabaranov/go-openai \
		sawka:txwrap:v0.2.0:sawka_txwrap/vendor/github.com/sawka/txwrap \
		shirou:gopsutil:v4.24.11:shirou_gopsutil_v4/vendor/github.com/shirou/gopsutil/v4 \
		sirupsen:logrus:v1.9.3:sirupsen_logrus/vendor/github.com/sirupsen/logrus \
		skeema:knownhosts:v1.3.0:skeema_knownhosts/vendor/github.com/skeema/knownhosts \
		skratchdot:open-golang:eef842397966:skratchdot_open_golang/vendor/github.com/skratchdot/open-golang \
		spf13:cobra:v1.8.1:spf13_cobra/vendor/github.com/spf13/cobra \
		spf13:pflag:v1.0.5:spf13_pflag/vendor/github.com/spf13/pflag \
		tklauser:go-sysconf:v0.3.12:tklauser_go_sysconf/vendor/github.com/tklauser/go-sysconf \
		tklauser:numcpus:v0.6.1:tklauser_numcpus/vendor/github.com/tklauser/numcpus \
		uber-go:atomic:v1.7.0:uber_go_atomic/vendor/go.uber.org/atomic \
		ubuntu:decorate:2d5b0a9bb117:ubuntu_decorate/vendor/github.com/ubuntu/decorate \
		ubuntu:GoWSL:049fd49bd93b:ubuntu_gowsl/vendor/github.com/ubuntu/gowsl \
		wavetermdev:htmltoken:v0.2.0:wavetermdev_htmltoken/vendor/github.com/wavetermdev/htmltoken \
		wavetermdev:ssh_config:6409e4292f34:wavetermdev_ssh_config/vendor/github.com/kevinburke/ssh_config \
		yusufpapurcu:wmi:v1.2.4:yusufpapurcu_wmi/vendor/github.com/yusufpapurcu/wmi
GH_TUPLE+=	swc-project:swc:v1.8.0:swc/swc

CARGO_CARGOTOML=${WRKSRC}/swc/bindings/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/swc/bindings/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PLIST_SUB=	ARCH=${ARCH:S/aarch64/arm64/:S/amd64/x64/} \
		DISTVERSION=${DISTVERSION}
PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn4 appbuilder:devel prefetch extract rebuild build:builder

ELECTRON_MAKE_FLAGS+=	-c electron-builder.config.cjs

post-extract:
	${CP} ${FILESDIR}/modules.txt ${WRKSRC}/vendor

pre-build:
	cd ${WRKSRC}/swc/bindings && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} CARGO_FEATURE_LOCAL_DYNAMIC_TLS=1 \
		${CARGO} build --manifest-path ${CARGO_CARGOTOML} \
		--package binding_core_node --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/release/libbinding_core_node.so \
		${WRKSRC}/node_modules/@swc/core/swc.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${GO_ENV} task --verbose build:backend
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:prod
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
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/make/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
