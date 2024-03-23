PORTNAME=	waveterm
DISTVERSIONPREFIX=	v
DISTVERSION=	0.7.1
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Open-source, cross-platform terminal for seamless workflows
WWW=		https://www.waveterm.dev/

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:29 go:1.22,modules,no_targets nodejs:20,build

USE_GITHUB=	yes
GH_ACCOUNT=	wavetermdev
GH_TUPLE=	\
		alessio:shellescape:v1.4.1:alessio_shellescape/vendor/github.com/alessio/shellescape \
		armon:circbuf:5111143e8da2:armon_circbuf/vendor/github.com/armon/circbuf \
		creack:pty:v1.1.18:creack_pty/vendor/github.com/creack/pty \
		fsnotify:fsnotify:v1.6.0:fsnotify_fsnotify/vendor/github.com/fsnotify/fsnotify \
		golang-migrate:migrate:v4.16.2:golang_migrate_migrate_v4/vendor/github.com/golang-migrate/migrate/v4 \
		golang:crypto:v0.17.0:golang_crypto/vendor/golang.org/x/crypto \
		golang:mod:v0.10.0:golang_mod/vendor/golang.org/x/mod \
		golang:sys:v0.15.0:golang_sys/vendor/golang.org/x/sys \
		google:go-github:v60.0.0:google_go_github_v60/vendor/github.com/google/go-github/v60 \
		google:go-querystring:v1.1.0:google_go_querystring/vendor/github.com/google/go-querystring \
		google:uuid:v1.3.0:google_uuid/vendor/github.com/google/uuid \
		gorilla:mux:v1.8.0:gorilla_mux/vendor/github.com/gorilla/mux \
		gorilla:websocket:v1.5.0:gorilla_websocket/vendor/github.com/gorilla/websocket \
		hashicorp:errwrap:v1.1.0:hashicorp_errwrap/vendor/github.com/hashicorp/errwrap \
		hashicorp:go-multierror:v1.1.1:hashicorp_go_multierror/vendor/github.com/hashicorp/go-multierror \
		jmoiron:sqlx:v1.3.5:jmoiron_sqlx/vendor/github.com/jmoiron/sqlx \
		mattn:go-sqlite3:v1.14.16:mattn_go_sqlite3/vendor/github.com/mattn/go-sqlite3 \
		mvdan:sh:v3.7.0:mvdan_sh/vendor/mvdan.cc/sh/v3 \
		sashabaranov:go-openai:v1.9.0:sashabaranov_go_openai/vendor/github.com/sashabaranov/go-openai \
		sawka:txwrap:v0.1.2:sawka_txwrap/vendor/github.com/sawka/txwrap \
		uber-go:atomic:v1.7.0:uber_go_atomic/vendor/go.uber.org/atomic \
		wavetermdev:ssh_config:17e2087ebde2:wavetermdev_ssh_config/vendor/github.com/kevinburke/ssh_config \
		wavetermdev:waveterm:aeb7195eff05:wavetermdev_waveterm_wavesrv/vendor/github.com/wavetermdev/waveterm

SUB_FILES=	${PORTNAME}

USE_ELECTRON=	npm:yarn1 prefetch extract rebuild:electron build:builder

BUILD_TIME!=		date +'%Y%m%d%H%M'
WAVESHELL_VERSION=	v0.5
WAVESRV_VERSION=	${DISTVERSION}
GO_LDFLAGS=		-s -w -X main.BuildTime=${BUILD_TIME}
ELECTRON_MAKE_FLAGS=	-c electron-builder.config.js

pre-build:
	cd ${WRKSRC}/waveshell && \
		${SETENV} ${MAKE_ENV} ${GO_ENV} ${GO_CMD} build ${GO_BUILDFLAGS:S/-mod=vendor//} \
		-ldflags "${GO_LDFLAGS}" \
		-o ../bin/mshell/mshell-${WAVESHELL_VERSION}-freebsd.amd64 main-waveshell.go
	cd ${WRKSRC}/wavesrv && \
		${SETENV} ${MAKE_ENV} ${GO_ENV} ${GO_CMD} build ${GO_BUILDFLAGS:S/-mod=vendor//} \
		-tags "osusergo,netgo,sqlite_omit_load_extension" \
		-ldflags "${GO_LDFLAGS} -X main.WaveVersion=${WAVESRV_VERSION}" \
		-o ../bin/wavesrv.amd64 ./cmd
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run webpack --env prod
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=waveterm.icns --out=icons --format=set --root=public
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/waveterm_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/${PORTNAME}_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/make/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

.include <bsd.port.mk>
