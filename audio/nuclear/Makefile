# $FreeBSD$

PORTNAME=	nuclear
DISTVERSIONPREFIX=	v
DISTVERSION=	0.6.17
CATEGORIES=	audio
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Modern music player focused on streaming from free sources

LICENSE=	AGPLv3+
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder
RUN_DEPENDS=	fpcalc:audio/chromaprint

USES=		desktop-file-utils electron:12 gnome localbase:ldflags \
		node:14,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	nukeop

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md LEGAL.md README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm:fetch,build
USE_ELECTRON=	extract prebuild build:builder

PREFETCH_TIMESTAMP=	1637828215
ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.main=dist/main.js

pre-fetch:
	${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} ]; then \
		${MKDIR} ${WRKDIR}/npm-cache; \
		${CP} -r ${FILESDIR}/packagejsons/* ${WRKDIR}/npm-cache; \
		cd ${WRKDIR}/npm-cache && \
			${SETENV} HOME=${WRKDIR} ${NPM_CMD} ci --ignore-scripts; \
		cd ${WRKDIR}/npm-cache && \
			${SETENV} HOME=${WRKDIR} ${NPX_CMD} lerna bootstrap --hoist --ignore-scripts --ci; \
		cd ${WRKDIR}/npm-cache/packages && \
			for dir in *; do \
				${RM} $${dir}/package.json $${dir}/package-lock.json; \
			done; \
		cd ${WRKDIR}/npm-cache && \
		 	${RM} lerna.json package.json package-lock.json; \
		${FIND} ${WRKDIR}/npm-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp npm-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./npm-cache:' > npm-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} \
			@npm-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-patch:
	${REINPLACE_CMD} -e 's/make/g&/' \
		${WRKSRC}/node_modules/lzma-native/liblzma-build.sh

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPX_CMD} lerna run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
.for size in 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${LN} -sf ${LOCALBASE}/bin/fpcalc ${STAGEDIR}${DATADIR}/resources/bin/fpcalc

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
