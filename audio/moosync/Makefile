PORTNAME=	moosync
DISTVERSIONPREFIX=	v
DISTVERSION=	9.0.2
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Music player capable of playing local audio or from Youtube, Spotify and many more
WWW=		https://moosync.app/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libasound.so:audio/alsa-lib \
		libvips.so:graphics/vips

USES=		cargo desktop-file-utils electron:25 nodejs:18,build pkgconfig \
		python:build sqlite

USE_GITHUB=	yes
GH_ACCOUNT=	Moosync
GH_PROJECT=	Moosync

CARGO_CARGOTOML=${WRKSRC}/node_modules/librespot-node/native/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/node_modules/librespot-node/native/Cargo.lock
# CARGO_CARGOTOML=${WRKSRC}/node_modules/scanner-native/Cargo.toml
# CARGO_CARGOLOCK=${WRKSRC}/node_modules/scanner-native/Cargo.lock
# CARGO_CARGOLOCK=${WRKSRC}/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn prefetch extract

PREFETCH_TIMESTAMP=	1689147943
ELECTRON_MAKE_CMD=	yarn electron:build
ELECTRON_MAKE_FLAGS=	--linux --dir
ELECTRON_BUILDER_APP_OUT_DIR=	linux-${ARCH:S/aarch64/arm64-/:S/amd64//:S/i386/ia32-/}unpacked
DO_MAKE_BUILD=		${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} ${ELECTRON_MAKE_FLAGS}

post-patch:
	${REINPLACE_CMD} -e 's|%%LOCALBASE%%|${LOCALBASE}|g; \
			s|%%ELECTRON_VER_MAJOR%%|${ELECTRON_VER_MAJOR}|g' \
		${WRKSRC}/vue.config.js

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run patch-package
.for dir in librespot-node scanner-native
	cd ${WRKSRC}/node_modules/${dir} && \
	${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm rebuild --verbose
.endfor
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build/icons
	${MV} ${WRKSRC}/icons/icon_512.png ${WRKSRC}/icons/icon_512x512.png

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist_electron/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test:unit
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test:electron

.include <bsd.port.mk>
