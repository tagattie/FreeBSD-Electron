PORTNAME=	astra
DISTVERSIONPREFIX=	v
DISTVERSION=	0.7.0-beta
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Audiophile desktop music player
WWW=		https://astramusic.dev/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libsndio.so:audio/sndio \
		libdbus-1.so:devel/dbus \
		libepoll-shim.so:devel/libepoll-shim \
		libffi.so:devel/libffi \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libdrm.so:graphics/libdrm \
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

USES=		electron:40 gettext-runtime gl gnome jpeg localbase:ldflags \
		nodejs:24,build npm:npm python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Boof2015

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf glib20 gtk30 libxml2 libxslt pango

BINARY_ALIAS=	python3=${PYTHON_CMD}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder rebuild build:builder

post-extract:
	@if [ -f ${FILESDIR}/dot.env.local ]; then \
		${CP} ${FILESDIR}/dot.env.local ${WRKSRC}/.env.local; \
	fi

post-patch:
	@${REINPLACE_CMD} 's|/run/user|/var&|' \
		${WRKSRC}/src/main/services/discordRpc.ts

pre-build:
	cd ${WRKSRC} && \
	${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm run build:native
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icon files
	cd ${WRKSRC} && \
	${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=resources
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

post-build:
	${LN} -sf ${LOCALBASE}/bin/ffmpeg \
		${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffmpeg-static/ffmpeg
	@${MKDIR} ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffprobe-static/bin/freebsd/${ELECTRON_ARCH}
	${LN} -sf ${LOCALBASE}/bin/ffprobe \
		${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffprobe-static/bin/freebsd/${ELECTRON_ARCH}/ffprobe

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	${TAR} -cf - -C ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} . | \
		${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}
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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
