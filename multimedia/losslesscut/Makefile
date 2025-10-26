PORTNAME=	losslesscut
DISTVERSIONPREFIX=	v
DISTVERSION=	3.66.1
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Swiss army knife of lossless video/audio editing
WWW=		https://mifi.no/losslesscut

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE

LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-core \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libsndio.so:audio/sndio \
		libdbus-1.so:devel/dbus \
		libepoll-shim.so:devel/libepoll-shim \
		libevent.so:devel/libevent \
		libffi.so:devel/libffi \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libdrm.so:graphics/libdrm \
		libwayland-client.so:graphics/wayland \
		libpng.so:graphics/png \
		libvips.so:graphics/vips \
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
RUN_DEPENDS=	ffmpeg:multimedia/ffmpeg

USES=		desktop-file-utils electron:38 gettext-runtime gl gmake gnome \
		iconv:wchar_t jpeg nodejs:22,build python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	mifi
GH_PROJECT=	lossless-cut

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf glib20 gtk30 libxml2 libxslt pango

BINARY_ALIAS=	python3=${PYTHON_CMD}

PORTDOCS=	CONTRIBUTING.md README.md api.md batch.md cli.md docs.md \
		import-export.md issues.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn4 appbuilder prefetch extract rebuild:nodejs,electron \
		build:builder

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=app.icns --out=icons --format=set --root=icon-build
.for size in 512 1024
	${MV} ${WRKSRC}/icons/app_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor

do-install:
	${INSTALL_DATA} ${WRKSRC}/no.mifi.losslesscut.desktop \
		${STAGEDIR}${DESKTOPDIR}/${PORTNAME}.desktop
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	${TAR} -cf - -C ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} . | \
		${TAR} -xf - -C ${STAGEDIR}${DATADIR}
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
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
