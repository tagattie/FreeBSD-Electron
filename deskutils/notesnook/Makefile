PORTNAME=	notesnook
DISTVERSIONPREFIX=	v
DISTVERSION=	2.5.8
CATEGORIES=	deskutils
DISTFILES=	${PREFETCH_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Fully open source & end-to-end encrypted note taking application
WWW=		https://notesnook.com/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		git:devel/git
LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
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
		libwebp.so:graphics/webp \
		libopenh264.so:multimedia/openh264 \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence \
		libfontconfig.so:x11-fonts/fontconfig

USES=		electron:24,build gettext-runtime gl gnome iconv:wchar_t jpeg \
		nodejs:18,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	streetwriters

USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf2 glib20 gtk30 libxml2 libxslt pango
USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

PORTDOCS=	CONTRIBUTING.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm,fetch,build build:builder

PREFETCH_FILE=		${PKGNAME}-node-modules${EXTRACT_SUFX}
PREFETCH_TIMESTAMP=	1690359799

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		cd ${WRKDIR}/node-modules-cache && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			npm ci --ignore-scripts --no-progress; \
		cd ${WRKDIR}/node-modules-cache && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache CI=1 \
			npm run bootstrap -- --scope=web; \
		cd ${WRKDIR}/node-modules-cache && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache CI=1 \
			npm run bootstrap -- --scope=desktop; \
		for i in apps extensions packages; do \
			cd ${WRKDIR}/node-modules-cache/$${i} && \
			for dir in *; do \
				${RM} $${dir}/package.json $${dir}/package-lock.json; \
			done; \
		done; \
		cd ${WRKDIR}/node-modules-cache && \
			${RM} -r scripts package.json package-lock.json; \
		${FIND} ${WRKDIR}/node-modules-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp node-modules-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
	 		-e 's:^\.:./node-modules-cache:' > node-modules-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PREFETCH_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	for dir in apps extensions packages; do \
		cd ${WRKDIR}/node-modules-cache/$${dir} && \
		for subdir in *; do \
			if [ -d $${subdir}/node_modules ]; then \
				${MV} $${subdir}/node_modules ${WRKSRC}/$${dir}/$${subdir}; \
			fi; \
		done; \
	done; \
	cd ${WRKDIR}/node-modules-cache && ${MV} node_modules ${WRKSRC}

pre-build:
	for dir in apps extensions packages; do \
		cd ${WRKSRC}/$${dir} && \
		for subdir in *; do \
			cd ${WRKSRC}/$${dir}/$${subdir} && \
			${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm rebuild --verbose; \
		done; \
	done
	# copy sodium-native node module to prebuilds directory
	${MKDIR} ${BUILD_WRKSRC}/node_modules/@notesnook/crypto/node_modules/@notesnook/sodium/node_modules/sodium-native/prebuilds/freebsd-${ELECTRON_ARCH}
	${CP} ${BUILD_WRKSRC}/node_modules/@notesnook/crypto/node_modules/@notesnook/sodium/node_modules/sodium-native/build/Release/sodium.node \
		${BUILD_WRKSRC}/node_modules/@notesnook/crypto/node_modules/@notesnook/sodium/node_modules/sodium-native/prebuilds/freebsd-${ELECTRON_ARCH}/node.napi.node
	${STRIP_CMD} ${BUILD_WRKSRC}/node_modules/@notesnook/crypto/node_modules/@notesnook/sodium/node_modules/sodium-native/prebuilds/freebsd-${ELECTRON_ARCH}/node.napi.node
	# first run of the following command fails for unknown reason
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx nx build:desktop @notesnook/web || ${TRUE}
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx nx build:desktop @notesnook/web
	${CP} -pR ${WRKSRC}/apps/web/build ${WRKSRC}/apps/desktop
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} npx nx run release --project @notesnook/desktop

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/apps/desktop/assets/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/output/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test:core
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test:web

.include <bsd.port.mk>
