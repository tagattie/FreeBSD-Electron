PORTNAME=	losslesscut
DISTVERSIONPREFIX=	v
DISTVERSION=	3.52.0
CATEGORIES=	multimedia
DIST_SUBDIR=	${PORTNAME}

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Swiss army knife of lossless video/audio editing
WWW=		https://mifi.no/losslesscut

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-core \
		libsnappy.so:archivers/snappy \
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
		libwebp.so:graphics/webp \
		libopenh264.so:multimedia/openh264 \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence \
		libfontconfig.so:x11-fonts/fontconfig
RUN_DEPENDS=	ffmpeg:multimedia/ffmpeg

USES=		desktop-file-utils gettext-runtime gl gmake gnome iconv jpeg \
		nodejs:18,build electron:23 python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	mifi
GH_PROJECT=	lossless-cut

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf2 glib20 gtk30 libxml2 libxslt pango

BINARY_ALIAS=	pyrhon3=${PYTHON_CMD}

PORTDOCS=	README.md cli.md developer-notes.md import-export.md issues.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:berry prefetch extract rebuild build:builder

PREFETCH_TIMESTAMP=	1678443471
YARN_VER=	3.3.0

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=app.icns --out=icons --format=set --root=icon-build
.for size in 512 1024
	${MV} ${WRKSRC}/icons/app_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor

do-install:
	${INSTALL_DATA} ${WRKSRC}/no.mifi.losslesscut.desktop \
		${STAGEDIR}${PREFIX}/share/applications/${PORTNAME}.desktop
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
.for f in ffmpeg ffprobe
	${LN} -sf ${LOCALBASE}/bin/${f} ${STAGEDIR}${DATADIR}/resources
.endfor
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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.mk>
