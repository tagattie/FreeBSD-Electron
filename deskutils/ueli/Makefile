# Notes for port maintainer
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ npm install --save-dev --ignore-scripts node-addon-api node-gyp

PORTNAME=	ueli
DISTVERSIONPREFIX=	v
DISTVERSION=	9.9.1
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Cross-platform keystroke launcher
WWW=		https://ueli.app/

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libvips.so:graphics/vips

USES=		cargo electron:33 localbase:ldflags nodejs:20,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	oliverschwendener
GH_TUPLE=	rollup:rollup:v4.22.4:rollup/rollup

CARGO_CARGOTOML=${WRKSRC}/rollup/rust/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/rollup/rust/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md PRIVACY_STATEMENT README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:builder

ELECTRON_MAKE_FLAGS+=	--config electron-builder.config.js

pre-build:
	cd ${WRKSRC}/rollup/rust && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/${CARGO_BUILD_TARGET}/release/libbindings_napi.so \
		${WRKSRC}/node_modules/rollup/dist/rollup.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/0x0/apps
	${INSTALL_DATA} ${WRKSRC}/assets/Build/app-icon-dark.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/0x0/apps/${PORTNAME}.png
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
