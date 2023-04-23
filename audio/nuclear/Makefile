PORTNAME=	nuclear
DISTVERSIONPREFIX=	v
DISTVERSION=	0.6.20
CATEGORIES=	audio
DISTFILES=	${PREFETCH_FILE}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Modern music player focused on streaming from free sources
WWW=		https://nuclear.js.org

LICENSE=	AGPLv3+
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder
RUN_DEPENDS=	fpcalc:audio/chromaprint

USES=		electron:12 localbase:ldflags nodejs:14,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	nukeop

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md LEGAL.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm,fetch,build build:builder

PREFETCH_FILE=	${PKGNAME}-node-modules${EXTRACT_SUFX}
PREFETCH_TIMESTAMP=	1682163980
ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.main=dist/main.js

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		cd ${WRKDIR}/node-modules-cache && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			npm ci --ignore-scripts --no-progress; \
		cd ${WRKDIR}/node-modules-cache && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			npx lerna bootstrap --hoist --ignore-scripts --ci; \
		cd ${WRKDIR}/node-modules-cache/packages && \
			for dir in *; do \
				${RM} $${dir}/package.json $${dir}/package-lock.json; \
			done; \
		cd ${WRKDIR}/node-modules-cache && \
			${RM} lerna.json package.json package-lock.json; \
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
	cd ${WRKDIR}/node-modules-cache/packages && \
	for dir in *; do \
		${MV} $${dir}/node_modules ${WRKSRC}/packages/$${dir}; \
	done; \
	cd ${WRKDIR}/node-modules-cache && ${MV} node_modules ${WRKSRC}

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx lerna run build
	cd ${WRKSRC}/node_modules/sqlite3 && \
		${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} npm run install
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}
	${LN} -sf ${LOCALBASE}/bin/fpcalc ${STAGEDIR}${DATADIR}/resources/bin/fpcalc

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
