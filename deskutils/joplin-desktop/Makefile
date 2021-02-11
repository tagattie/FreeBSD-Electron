# $FreeBSD$

PORTNAME=	joplin
DISTVERSIONPREFIX=	v
DISTVERSION=	1.7.11
CATEGORIES=	deskutils
PKGNAMESUFFIX=	-desktop
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Note taking and to-do application with synchronisation capabilities

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder \
		rsync:net/rsync
LIB_DEPENDS=	libvips.so:graphics/vips \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:10 gmake gnome localbase:ldflags \
		node:12,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22

INSTALLS_ICONS=	yes

SUB_FILES=	${PORTNAME}${PKGNAMESUFFIX}

PORTDOCS=	BUILD.md CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm:fetch,build
USE_ELECTRON=	extract prebuild build:builder

PREFETCH_TIMESTAMP=	1613027575

BUILD_WRKSRC=	${WRKSRC}/packages/app-desktop

pre-fetch:
	if [ ! -f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} ]; then \
		${MKDIR} ${WRKDIR}/npm-cache; \
		${CP} -r ${FILESDIR}/packagejsons/* ${WRKDIR}/npm-cache; \
		cd ${WRKDIR}/npm-cache && \
			${SETENV} HOME=${WRKDIR} ${NPM_CMD} ci --ignore-scripts; \
		cd ${WRKDIR}/npm-cache && \
			${SETENV} HOME=${WRKDIR} ${NPX_CMD} lerna bootstrap --ignore-scripts --ci --concurrency 1; \
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
		${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} \
			@npm-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
.for dir in app-cli app-clipper app-mobile generator-joplin plugin-repo-cli plugins server
	${RM} -r ${WRKSRC}/packages/${dir}
.endfor

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

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

.include <bsd.port.mk>
