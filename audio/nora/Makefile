# Notes for port maintainer
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ npm install --save-dev --ignore-scripts node-addon-api node-gyp

PORTNAME=	nora
DISTVERSIONPREFIX=	v
DISTVERSION=	3.1.0
DISTVERSIONSUFFIX=	-stable
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Elegant music player built using Electron and React
WWW=		https://noramusic.netlify.app/

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	rust188>0:lang/rust188
LIB_DEPENDS=	libvips.so:graphics/vips

USES=		cargo desktop-file-utils electron:35 nodejs:22,build

USE_GITHUB=	yes
GH_ACCOUNT=	Sandakan
GH_PROJECT=	Nora
GH_TUPLE=	swc-project:swc:v1.11.13:swc/swc

CARGO_CARGOTOML=${WRKSRC}/swc/bindings/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/swc/bindings/Cargo.lock
CARGO_BUILDDEP=	no
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md changelog.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm appbuilder:devel prefetch extract rebuild build:builder

pre-build:
	cd ${WRKSRC}/swc/bindings && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} CARGO_FEATURE_LOCAL_DYNAMIC_TLS=1 \
		${CARGO} build --manifest-path ${CARGO_CARGOTOML} \
		--package binding_core_node --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/release/libbinding_core_node.so \
		${WRKSRC}/node_modules/@swc/core/swc.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
	${MV} ${WRKSRC}/icons/icon_1024.png ${WRKSRC}/icons/icon_1024x1024.png

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
