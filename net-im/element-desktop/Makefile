# Notes for port maintainer(s)
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR},
# do the following steps:
# 1. Remove "pnpm run -r sane-postinstall" from postinstall script in
#    ${WRKSRC}/package.json

PORTNAME=	element-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.12.32
CATEGORIES=	net-im
MASTER_SITES=	https://github.com/${GH_ACCOUNT}/${GH_PROJECT}/releases/download/${DISTVERSIONFULL}/:element_web
DISTFILES=	element-${DISTVERSIONFULL}${EXTRACT_SUFX}:element_web

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Glossy Matrix collaboration client for desktop
WWW=		https://element.io

LICENSE=	AGPLv3+ GPLv3+
LICENSE_COMB=	dual
LICENSE_FILE_AGPLv3+ =	${WRKSRC}/LICENSE-AGPL-3.0
LICENSE_FILE_GPLv3+ =	${WRKSRC}/LICENSE-GPL-3.0

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libsqlcipher.so:databases/sqlcipher \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:44 gmake nodejs:24,build \
		npm:pnpm pkgconfig python:build

USE_GITHUB=	yes
GH_ACCOUNT=	element-hq
GH_PROJECT=	element-web
GH_TUPLE=	matrix-org:seshat:6.0.1:seshat/seshat

CARGO_CARGOTOML=${WRKSRC}/seshat/seshat-node/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/seshat/seshat-node/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no
CARGO_ENV=	OPENSSL_NO_VENDOR=1

MAKE_ENV=	CI=true

BINARY_ALIAS=	python=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

PORTDOCS=	CHANGELOG.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder:devel rebuild build:builder

.include <bsd.port.options.mk>

.if ${OSVERSION} >= 1500000
BUILD_DEPENDS+=	${LOCALBASE}/lib/compat/libutil.so.9:misc/compat14x
.endif

post-extract:
	@${ECHO_CMD} "trustLockfile: true" >> ${WRKSRC}/pnpm-workspace.yaml
	@${ECHO_CMD} "storeDir: ${WRKDIR}/node-modules-cache/pnpm-store" >> \
		${WRKSRC}/pnpm-workspace.yaml
	@${ECHO_CMD} "frozenStore: true" >> ${WRKSRC}/pnpm-workspace.yaml
	@${ECHO_CMD} "preferFrozenLockfile: true" >> ${WRKSRC}/pnpm-workspace.yaml
	@${MKDIR} ${BUILD_WRKSRC}/deploys
	@${MV} ${WRKDIR}/element-${DISTVERSIONFULL} ${BUILD_WRKSRC}/deploys
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} pnpm run fetch --noverify --cfgdir "element.io/release"

pre-build:
	cd ${WRKSRC}/seshat/seshat-node && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build \
		--manifest-path ${CARGO_CARGOTOML} \
		--release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/*/libmatrix_seshat.so \
		${BUILD_WRKSRC}/node_modules/@matrix-org/seshat/index.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run postinstall
	cd ${BUILD_WRKSRC}/node_modules/pkcs11js && \
	${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} pnpm rebuild
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} NX_SOCKET_DIR=/tmp/nx-tmp pnpm exec nx build:res
	cd ${BUILD_WRKSRC} && \
	${SETENV} ${MAKE_ENV} NX_SOCKET_DIR=/tmp/nx-tmp pnpm exec nx build:ts

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.png \
		${STAGEDIR}${PREFIX}/share/pixmaps/${PORTNAME}.png
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} + | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${BUILD_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test:unit

.include <bsd.port.mk>
