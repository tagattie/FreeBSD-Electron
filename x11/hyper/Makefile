PORTNAME=	hyper
DISTVERSIONPREFIX=	v
DISTVERSION=	4.0.0-q-canary.8
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Terminal built on web technologies
WWW=		https://hyper.is

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-core \
		libatspi.so:accessibility/at-spi2-core \
		libsnappy.so:archivers/snappy \
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
		libpng.so:graphics/png \
		libwayland-client.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libpipewire-0.3.so:multimedia/pipewire \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence
RUN_DEPENDS=	bash:shells/bash

USES=		desktop-file-utils electron:34 gettext-runtime gl gnome iconv \
		jpeg localbase:ldflags nodejs:20,build python:build shebangfix \
		xorg

USE_GITHUB=	yes
GH_ACCOUNT=	quine-global

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	atk cairo gdkpixbuf glib20 gtk30 libxml2 libxslt pango

SHEBANG_FILES=	build/linux/${PORTNAME}

PORTDOCS=	PLUGINS.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1 prefetch extract rebuild build:builder

post-extract:
	@${MKDIR} ${WRKSRC}/target
	@${CP} -R ${WRKSRC}/app/node_modules ${WRKSRC}/target

pre-build:
	cd ${WRKSRC}/node_modules/leveldown && \
		${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} npm rebuild
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} yarn exec cross-env npm_config_arch=x64 yarn run v8-snapshot:arch
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} yarn exec webpack --config-name hyper-app
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} yarn run rebuild-node-pty
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} yarn run cpy --cwd=target node_modules "../../app/"
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} yarn run generate-schema
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} yarn run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	${TAR} -cf - -C ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} . | \
		${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	${RM} -r ${STAGEDIR}${DATADIR}/gen
	${RM} -r ${STAGEDIR}${DATADIR}/node_headers
	${RLN} ${STAGEDIR}${DATADIR}/resources/bin/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test:unit

.include <bsd.port.mk>
