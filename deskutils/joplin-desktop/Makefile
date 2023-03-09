PORTNAME=	joplin
DISTVERSIONPREFIX=	v
DISTVERSION=	2.9.17
CATEGORIES=	deskutils
PKGNAMESUFFIX=	-desktop
DISTFILES=	${PREFETCH_FILE}:prefetch \
		yarn-${YARN_VER}.tgz:prefetch
DIST_SUBDIR=	${PORTNAME}${PKGNAMESUFFIX}
EXTRACT_ONLY=	${DISTNAME}${EXTRACT_SUFX} \
		${PREFETCH_FILE}

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Note taking and to-do application with synchronisation capabilities
WWW=		https://joplinapp.org

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		rsync:net/rsync
LIB_DEPENDS=	libvips.so:graphics/vips \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:19 gmake localbase:ldflags \
		nodejs:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22

BINARY_ALIAS=	python3=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}${PKGNAMESUFFIX}

BUILD_WRKSRC=	${WRKSRC}/packages/app-desktop
TEST_WRKSRC=	${WRKSRC}/packages/app-desktop

PORTDOCS=	BUILD.md CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

PREFETCH_FILE=	${PKGNAME}-node-modules${EXTRACT_SUFX}
PREFETCH_TIMESTAMP=	1678340740
YARN_VER=	3.1.1

post-extract:
	${MKDIR} ${WRKSRC}/.yarn
	${MV} ${WRKDIR}/cache ${WRKSRC}/.yarn

pre-configure:
	${MKDIR} ${WRKDIR}/.bin
	${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn config set enableNetwork false

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn install --immutable --immutable-cache
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		yarn run electron-rebuild --force-abi 89
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}${PKGNAMESUFFIX}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 24 32 48 72 96 128 144 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

maintainer-fetch:
	${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/.bin; \
		${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin; \
		if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz ]; then \
			cd ${WRKDIR} && \
				${SETENV} ${MAKE_ENV} corepack prepare --activate --output yarn@${YARN_VER}; \
			${MV} ${WRKDIR}/corepack.tgz ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz; \
		else \
			${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz; \
		fi; \
		cd ${WRKSRC} && \
			${SETENV} ${MAKE_ENV} yarn config set enableScripts false && \
			${SETENV} ${MAKE_ENV} yarn install --immutable; \
		cd ${WRKSRC}/.yarn && \
			${MTREE_CMD} -cbnSp cache | ${MTREE_CMD} -C | ${SED} \
				-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
				-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
				-e 's:flags=.*:flags=none:' \
				-e 's:^\.:./cache:' > node-modules-cache.mtree && \
			${TAR} -cz --options 'gzip:!timestamp' \
				-f ${DISTDIR}/${DIST_SUBDIR}/${PREFETCH_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

.include <bsd.port.mk>
