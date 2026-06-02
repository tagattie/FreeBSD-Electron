PORTNAME=	element-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.12.20
CATEGORIES=	net-im
MASTER_SITES=	https://github.com/${GH_ACCOUNT}/element-web/releases/download/${DISTVERSIONFULL}/:element_web \
		https://registry.npmjs.org/matrix-seshat/-/:matrix_seshat
DISTFILES=	element-${DISTVERSIONFULL}${EXTRACT_SUFX}:element_web \
		matrix-seshat-${MATRIX_SESHAT_VER}.tgz:matrix_seshat \
		${YARN_FILE}:prefetch \
		${MATRIX_SESHAT_NODE_MODULES_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Glossy Matrix collaboration client for desktop
WWW=		https://element.io

LICENSE=	AGPLv3+ GPLv3+
LICENSE_COMB=	dual
LICENSE_FILE_AGPLv3+ =	${WRKSRC}/LICENSE-AGPL-3.0
LICENSE_FILE_GPLv3+ =	${WRKSRC}/LICENSE-GPL-3.0

FETCH_DEPENDS=	git:devel/git \
		yarn${NODEJS_SUFFIX}>0:www/yarn${NODEJS_SUFFIX}
EXTRACT_DEPENDS=jq:textproc/jq
LIB_DEPENDS=	libsqlcipher.so:databases/sqlcipher \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:42 gmake nodejs:24,build \
		pkgconfig python:build

USE_GITHUB=	yes
GH_ACCOUNT=	element-hq
GH_PROJECT=	element-web

CARGO_CARGOTOML=${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.toml
CARGO_CARGOLOCK=${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no
CARGO_ENV=	OPENSSL_NO_VENDOR=1

BINARY_ALIAS=	python=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

PORTDOCS=	CHANGELOG.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder:devel prefetch extract rebuild build:builder

YARN_FILE=		yarn-${YARN_VER}.tgz
YARN_VER=		1.22.22
MATRIX_SESHAT_NODE_MODULES_FILE=	${PORTNAME}-${DISTVERSION}-matrix-seshat-node-modules${EXTRACT_SUFX}
MATRIX_SESHAT_VER=	4.3.0
RUST_ARCH=		${ARCH:S/amd64/x86_64/:S/i386/i686/}

pre-fetch:
	@if [ ! -f ${DISTDIR}/${YARN_FILE} ]; then \
		${MKDIR} ${WRKDIR}/.bin; \
		cd ${WRKDIR} && \
		${SETENV} ${MAKE_ENV} corepack pack yarn@${YARN_VER} && \
		${TAR} -xzf corepack.tgz && \
		${SETENV} SCRIPTSDIR=${SCRIPTSDIR} WRKDIR=${WRKDIR} \
			${SH} ${SCRIPTSDIR}/electron-create-mtree.sh yarn > \
			yarn.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${YARN_FILE} @yarn.mtree; \
	fi
	@if [ ! -f ${DISTDIR}/${MATRIX_SESHAT_NODE_MODULES_FILE} ]; then \
		${ECHO_MSG} "===>  Prefetching and archiving node modules for matrix-seshat"; \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${CP} ${FILESDIR}/matrix-seshat/* ${WRKDIR}/node-modules-cache; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/node-modules-cache/.yarnrc; \
		cd ${WRKDIR}/node-modules-cache && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn install --frozen-lockfile --ignore-scripts --silent; \
		cd ${WRKDIR}/node-modules-cache && \
		${SETENV} SCRIPTSDIR=${SCRIPTSDIR} WRKDIR=${WRKDIR} \
			${SH} ${SCRIPTSDIR}/electron-create-mtree.sh yarn-offline-cache > \
			node-modules-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${MATRIX_SESHAT_NODE_MODULES_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}/node-modules-cache; \
	fi

post-extract:
	@${MKDIR} ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack install -g ${DISTDIR}/${YARN_FILE}
	@${MKDIR} ${WRKSRC}/matrix-seshat
	@${TAR} -xf ${DISTDIR}/matrix-seshat-${MATRIX_SESHAT_VER}.tgz \
		--strip-components 1 \
		-C ${WRKSRC}/matrix-seshat
	@${MKDIR} ${BUILD_WRKSRC}/.hak/hakModules/matrix-seshat \
		${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	@cd ${WRKSRC}/matrix-seshat && \
	${COPYTREE_SHARE} . ${BUILD_WRKSRC}/.hak/hakModules/matrix-seshat
	@cd ${WRKSRC}/matrix-seshat && \
	${COPYTREE_SHARE} . ${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
.for f in package.json yarn.lock
	@${CP} ${FILESDIR}/matrix-seshat/${f} \
		${BUILD_WRKSRC}/.hak/matrix-seshat/x86_64-unknown-freebsd/build
.endfor
	@${MV} ${WRKDIR}/yarn-offline-cache \
		${BUILD_WRKSRC}/.hak/matrix-seshat/x86_64-unknown-freebsd/build
	@${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
		${BUILD_WRKSRC}/.hak/matrix-seshat/x86_64-unknown-freebsd/build/.yarnrc
	@${MKDIR} ${BUILD_WRKSRC}/deploys
	@${MV} ${WRKDIR}/element-${DISTVERSIONFULL} ${BUILD_WRKSRC}/deploys
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} pnpm run fetch --noverify --cfgdir "element.io/release"
	@${REINPLACE_CMD} -e "/sane-postinstall/s/install-app-deps/& --platform linux/" \
		${BUILD_WRKSRC}/package.json
	@${ECHO_CMD} "$$(jq '. += { "packageManager": "yarn@${YARN_VER}" }' ${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/package.json)" > \
		${BUILD_WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/package.json

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run postinstall
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${ELECTRON_REBUILD_ENV} pnpm run build:native check && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${ELECTRON_REBUILD_ENV} pnpm run build:native build && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${ELECTRON_REBUILD_ENV} pnpm run build:native copy
	${RLN} ${BUILD_WRKSRC}/.hak/hakModules/matrix-seshat \
		${WRKSRC}/node_modules/matrix-seshat
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} NX_DAEMON=false NX_SOCKET_DIR=/tmp/nx-tmp pnpm exec nx build:res
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} NX_DAEMON=false NX_SOCKET_DIR=/tmp/nx-tmp pnpm exec nx build:ts

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.png \
		${STAGEDIR}${PREFIX}/share/pixmaps/${PORTNAME}.png
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${BUILD_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test:unit

.include <bsd.port.mk>
