PORTNAME=	nora
DISTVERSIONPREFIX=	v
DISTVERSION=	3.0.0
DISTVERSIONSUFFIX=	-stable
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Elegant music player built using Electron and React
WWW=		https://noramusic.netlify.app/

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libsndio.so:audio/sndio \
		libdbus-1.so:devel/dbus \
		libicui18n.so:devel/icu \
		libepoll-shim.so:devel/libepoll-shim \
		libevent.so:devel/libevent \
		libffi.so:devel/libffi \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libdrm.so:graphics/libdrm \
		libpng.so:graphics/png \
		libvips.so:graphics/vips \
		libwayland-client.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libpipewire-0.3.so:multimedia/pipewire \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence \
		libfontconfig.so:x11-fonts/fontconfig

USES=		cargo desktop-file-utils electron:30 gettext-runtime gl gnome \
		jpeg nodejs:20,build xorg
USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf2 glib20 gtk30 libxml2 libxslt pango

USE_GITHUB=	yes
GH_ACCOUNT=	Sandakan
GH_PROJECT=	Nora
GH_TUPLE=	rollup:rollup:v4.17.2:rollup/rollup

CARGO_CARGOTOML=${WRKSRC}/rollup/rust/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/rollup/rust/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

PORTDOCS=	README.md changelog.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:builder

PREFETCH_FILE=	${PKGNAME}-node-modules${EXTRACT_SUFX}

pre-build:
	cd ${WRKSRC}/rollup/rust && \
		${SETENV} ${MAKE_ENV} ${CARGO} build --release --verbose --verbose
	${CP} ${WRKSRC}/rollup/rust/target/release/libbindings_napi.so \
		${WRKSRC}/node_modules/rollup/dist/rollup.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC}/node_modules/sharp && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm run install
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
	${MV} ${WRKSRC}/icons/icon_1024.png ${WRKSRC}/icons/icon_1024x1024.png

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	${RM} -r ${STAGEDIR}${DATADIR}/gen
	${RM} -r ${STAGEDIR}${DATADIR}/node_headers
	${RLN} ${STAGEDIR}${DATADIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
