PORTNAME=	rocketchat-desktop
DISTVERSION=	3.7.4
CATEGORIES=	net-im
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Rocket.Chat desktop client

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		${LOCALBASE}/libdata/pkgconfig/vips.pc:graphics/vips

USES=		desktop-file-utils electron:16 node:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	RocketChat
GH_PROJECT=	Rocket.Chat.Electron

SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn:fetch,extract,build
USE_ELECTRON=	prebuild build:builder

PREFETCH_TIMESTAMP=	1641033534

pre-fetch:
	if [ ! -f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} ]; then \
		${MKDIR} ${WRKDIR}; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/.yarnrc; \
		${CP} -r ${PKGJSONSDIR}/* ${WRKDIR}; \
		cd ${WRKDIR} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			${YARN_CMD} --frozen-lockfile --ignore-scripts; \
		cd ${WRKDIR} && \
			${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > yarn-offline-cache.mtree; \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} \
			@yarn-offline-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	cd ${WRKSRC} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		${YARN_CMD} --frozen-lockfile --ignore-scripts --offline

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${YARN_CMD} build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${YARN_CMD} test

.include <bsd.port.mk>
