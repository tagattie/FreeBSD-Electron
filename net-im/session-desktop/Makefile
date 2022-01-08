PORTNAME=	session-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.7.6
CATEGORIES=	net-im
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Onion routing based messenger

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git \
		git-lfs:devel/git-lfs
BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:13 localbase:ldflags node:14,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	oxen-io

SUB_FILES=	${PORTNAME}

PORTDOCS=	BUILDING.md CONTRIBUTING.md README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn:fetch,build
USE_ELECTRON=	extract prebuild build:builder

PREFETCH_TIMESTAMP=	1641618575
MAKE_ENV+=	SIGNAL_ENV=production
ELECTRON_MAKE_FLAGS+=	--config.asar=false \
			--config.extraMetadata.environment=production \
			--config.directories.output=release

pre-fetch:
	if [ ! -f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} ]; then \
		${MKDIR} ${WRKDIR}; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/.yarnrc; \
		${CP} -r ${PKGJSONSDIR}/* ${WRKDIR}; \
		${SETENV} HOME=${WRKDIR} git lfs install --manual; \
		cd ${WRKDIR} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				${YARN_CMD} --frozen-lockfile --ignore-scripts && \
			${RM} package.json yarn.lock; \
		cd ${WRKDIR}; \
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

post-configure:
	${RM} -r ${WRKSRC}/node_modules/dtrace-provider

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${YARN_CMD} generate

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources/app && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${YARN_CMD} test

.include <bsd.port.mk>
