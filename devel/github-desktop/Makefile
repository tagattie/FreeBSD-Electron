PORTNAME=	github-desktop
DISTVERSIONPREFIX=	release-
DISTVERSION=	3.3.12
DISTVERSIONSUFFIX=	-linux2
CATEGORIES=	devel
DISTFILES=	${PREFETCH_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Focus on what matters instead of fighting with Git
WWW=		https://github.com/shiftkey/desktop

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	zip:archivers/zip \
		npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
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
		libwayland-egl.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libpipewire-0.3.so:multimedia/pipewire \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence
RUN_DEPENDS=	git:devel/git \
		git-lfs:devel/git-lfs

USES=		desktop-file-utils electron:28 gettext-runtime gl gmake gnome \
		iconv:wchar_t jpeg localbase:ldflags nodejs:18,build pkgconfig \
		python shebangfix ssl xorg

USE_GITHUB=	yes
GH_ACCOUNT=	shiftkey
GH_PROJECT=	desktop
GH_TUPLE=	github:gemoji:50865e8895c54037bf06c4c1691aa925d030a59d:gemoji/gemoji \
		github:gitignore:e89e04390435f1e7628740d7b4ce1fe65ac218fd:gitignore/app/static/common/gitignore \
		github:choosealicense.com:d4edd14487305505af3eab98e364b9d2a86c5eec:choosealicense/app/static/common/choosealicense.com

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf2 glib20 gtk30 libxml2 libxslt pango

USE_ELECTRON=	npm:yarn1,fetch,extract,build

.include <bsd.port.pre.mk>

PREFETCH_FILE=	${PORTNAME}-${DISTVERSION}-node-modules${EXTRACT_SUFX}
UPSTREAM_ELECTRON_VER!=		${GREP} -e 'resolved.*/electron/' ${PKGJSONSDIR}/yarn.lock | \
				${HEAD} -n 1 | ${AWK} -F- '{print $$NF}' | ${SED} -E 's/\.[a-z]+.*$$//'
ELECTRON_DOWNLOAD_URL=		https://github.com/electron/electron/releases/download/v${UPSTREAM_ELECTRON_VER}
ELECTRON_DOWNLOAD_URL_HASH!=	${SHA256} -q -s ${ELECTRON_DOWNLOAD_URL}
ELECTRON_DOWNLOAD_CACHE_DIR=	.cache/electron/${ELECTRON_DOWNLOAD_URL_HASH}
MAKE_ENV+=	CIRCLE_SHA1=34c4e128313494d1d07a08133d92707cbf7e4754

REINPLACE_FILES=	app/src/lib/editors/linux.ts \
			app/src/lib/shells/linux.ts \
			app/node_modules/dugite/build/lib/git-environment.js

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/node-modules-cache/.yarnrc; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		for dir in . app; do \
			cd ${WRKDIR}/node-modules-cache/$${dir} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				yarn --frozen-lockfile --ignore-scripts; \
		done; \
		${FIND} ${WRKDIR}/node-modules-cache -depth 1 -print | ${GREP} -v yarn-offline-cache | \
			${XARGS} ${RM} -r; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > node-modules-cache.mtree; \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PREFETCH_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
.for dir in . app
.   for f in package.json yarn.lock
	if [ -f ${WRKSRC}/${dir}/${f} ]; then \
		${MV} -f ${WRKSRC}/${dir}/${f} ${WRKSRC}/${dir}/${f}.bak; \
	fi
	${CP} ${PKGJSONSDIR}/${dir}/${f} ${WRKSRC}/${dir}
.   endfor
	cd ${WRKSRC}/${dir} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn --frozen-lockfile --ignore-scripts --offline
.endfor

post-patch:
	${REINPLACE_CMD} -e 's|%%LOCALBASE%%|${LOCALBASE}|' \
		${REINPLACE_FILES:S|^|${WRKSRC}/|}

pre-build:
	${RM} -r ${WRKDIR}/electron-dist
	${MKDIR} ${WRKDIR}/electron-dist
	cd ${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
	${MKDIR} ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}
	cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}/electron-v${UPSTREAM_ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip .
	cd ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_ELECTRON_VER}

do-build:
	${MKDIR} ${WRKSRC}/app/node_modules/dugite/git
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn compile:script
	cd ${WRKSRC}/app && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm rebuild --no-progress
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build:prod

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 32 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/app/static/linux/logos/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd "${WRKSRC}/dist/GitHub Desktop-linux-${ELECTRON_ARCH}" && \
		${TAR} -cf - . | ${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	${RM} -r ${STAGEDIR}${DATADIR}/gen
	${RM} -r ${STAGEDIR}${DATADIR}/node_headers
	${RM} -r ${STAGEDIR}${DATADIR}/resources/app/git
	${MV} -f ${STAGEDIR}${DATADIR}/"GitHub Desktop" ${STAGEDIR}${DATADIR}/${PORTNAME}
	${RLN} ${STAGEDIR}${DATADIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.post.mk>
