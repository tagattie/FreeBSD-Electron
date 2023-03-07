PORTNAME=	hyper
DISTVERSIONPREFIX=	v
DISTVERSION=	3.4.1
CATEGORIES=	x11
DISTFILES=	${PREFETCH_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Terminal built on web technologies
WWW=		https://hyper.is

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-core \
		libatspi.so:accessibility/at-spi2-core \
		libsnappy.so:archivers/snappy \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libdbus-1.so:devel/dbus \
		libicui18n.so:devel/icu \
		libevent.so:devel/libevent \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libdrm.so:graphics/libdrm \
		libpng.so:graphics/png \
		libwayland-client.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libpython3.9.so:lang/python39 \
		libopenh264.so:multimedia/openh264 \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence
RUN_DEPENDS=	bash:shells/bash

USES=		desktop-file-utils electron:20,build,test gettext-runtime gl \
		gnome iconv jpeg localbase:ldflags nodejs:16,build python:build \
		shebangfix xorg

USE_GITHUB=	yes
GH_ACCOUNT=	vercel

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	atk cairo gdkpixbuf2 glib20 gtk30 libxml2 libxslt pango

SHEBANG_FILES=	build/linux/${PORTNAME}

PORTDOCS=	PLUGINS.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn,fetch,extract,build,test rebuild:electron build:builder

PREFETCH_FILE=	${PKGNAME}-node-modules${EXTRACT_SUFX}
PREFETCH_TIMESTAMP=	1677722716
UPSTREAM_MKSNAPSHOT_VER=20.3.6

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/.yarnrc; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}; \
		cd ${WRKDIR} && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn --frozen-lockfile --ignore-scripts; \
		cd ${WRKDIR}/target && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn --frozen-lockfile --ignore-scripts; \
		${FIND} ${WRKDIR} -depth 1 -print | ${GREP} -v yarn-offline-cache | ${XARGS} ${RM} -r; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > yarn-offline-cache.mtree; \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PREFETCH_FILE} @yarn-offline-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	${MKDIR} ${WRKSRC}/target
	cd ${PKGJSONSDIR} && \
	for f in package.json yarn.lock; do \
		if [ -f ${WRKSRC}/$${f} ]; then \
			${MV} -f ${WRKSRC}/$${f} ${WRKSRC}/$${f}.bak; \
		fi; \
		${CP} $${f} ${WRKSRC}; \
	done
	cd ${PKGJSONSDIR}/target && \
	for f in package.json yarn.lock; do \
		if [ -f ${WRKSRC}/target/$${f} ]; then \
			${MV} -f ${WRKSRC}/target/$${f} ${WRKSRC}/target/$${f}.bak; \
		fi; \
		${CP} $${f} ${WRKSRC}/target; \
	done
	${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	cd ${WRKSRC} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn --frozen-lockfile --ignore-scripts --offline
	cd ${WRKSRC}/target && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn --frozen-lockfile --ignore-scripts --offline
	${MKDIR} ${WRKSRC}/node_modules/electron/dist

pre-build:
	cd ${WRKSRC}/node_modules/leveldown && ${SETENV} ${MAKE_ENV} \
		npm_config_nodedir=${LOCALBASE} \
		npm rebuild --no-progress
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run cross-env npm_config_arch=x64 yarn run v8-snapshot:arch
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run webpack --config-name hyper-app
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run cpy --cwd=target --parents "node_modules/**/*" "../app/"
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run cross-env BABEL_ENV=production babel target/renderer/bundle.js \
			--out-file target/renderer/bundle.js --no-comments --minified
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources/app.asar.unpacked && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'
	${FIND} ${STAGEDIR}${DATADIR} -type f -name '*.orig' -delete
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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.mk>
