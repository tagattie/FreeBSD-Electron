PORTNAME=	tabby
DISTVERSIONPREFIX=	v
DISTVERSION=	1.0.201
CATEGORIES=	x11
DISTFILES=	${PREFETCH_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Terminal for a more modern age
WWW=		https://tabby.sh

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
		libsnappy.so:archivers/snappy \
		libasound.so:audio/alsa-lib \
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
		libpcre2-8.so:devel/pcre2 \
		libdrm.so:graphics/libdrm \
		libpng.so:graphics/png \
		libwayland-client.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libpython${PYTHON_VER}.so:lang/python${PYTHON_SUFFIX} \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence

USES=		electron:25 gl gmake gnome iconv:wchar_t jpeg \
		localbase:ldflags nodejs:18,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Eugeny

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf2 gtk30 libxml2 libxslt pango

BINARY_ALIAS=	python3=${PYTHON_CMD}

PORTDOCS=	HACKING.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn,fetch,extract,build build:builder

PREFETCH_FILE=	${PKGNAME}-node-modules${EXTRACT_SUFX}
PREFETCH_TIMESTAMP=	1698665643

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/node-modules-cache/.yarnrc; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		cd ${PKGJSONSDIR} && \
		for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
			cd ${WRKDIR}/node-modules-cache/$${dir} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				yarn --frozen-lockfile --ignore-scripts; \
			${RM} package.json yarn.lock; \
		done; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > node-modules-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PREFETCH_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		for f in package.json yarn.lock; do \
			if [ -f ${WRKSRC}/$${dir}/$${f} ]; then \
				${MV} -f ${WRKSRC}/$${dir}/$${f} ${WRKSRC}/$${dir}/$${f}.bak; \
			fi; \
			${CP} $${dir}/$${f} ${WRKSRC}/$${dir}; \
		done; \
	done; \
	${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn --frozen-lockfile --ignore-scripts --offline; \
	done

post-patch:
	${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/app/node_modules/@serialport/bindings-cpp/binding.gyp
	${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/app/node_modules/fontmanager-redux/binding.gyp

pre-build:
.for module in cpu-features lzma-native ssh2
	cd ${WRKSRC}/node_modules/${module} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
		npm rebuild --no-progress
.endfor
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} node scripts/install-deps.mjs
	${CP} ${WRKSRC}/app/node_modules/glasstron/src/platforms/linux.js \
		${WRKSRC}/app/node_modules/glasstron/src/platforms/freebsd.js
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} node scripts/build-native.mjs
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node scripts/prepackage-plugins.mjs

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources/app.asar.unpacked && \
		${FIND} . -type f -perm 755 -exec ${FILE} {} ';' | \
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

.include <bsd.port.mk>
