PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	desktop-v
DISTVERSION=	2023.1.1
CATEGORIES=	security
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Bitwarden desktop application

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:21 gmake gnome \
		localbase:ldflags node:16,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	clients

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20

CARGO_CARGOTOML=${BUILD_WRKSRC}/desktop_native/Cargo.toml
CARGO_CARGOLOCK=${BUILD_WRKSRC}/desktop_native/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

MAKE_ENV=	${CARGO_ENV}

SUB_FILES=	${PORTNAME}

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm:fetch,build
USE_ELECTRON=	build:builder

PREFETCH_TIMESTAMP=	1675845384

pre-fetch:
	if [ ! -f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} ]; then \
		${MKDIR} ${WRKDIR}/npm-cache; \
		${CP} -r ${PKGJSONSDIR}/* ${WRKDIR}/npm-cache; \
		cd ${WRKDIR}/npm-cache && \
			${SETENV} HOME=${WRKDIR} ${NPM_CMD} ci --ignore-scripts --no-progress; \
		${RM} -r package.json package-lock.json apps libs; \
		${FIND} ${WRKDIR}/npm-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp npm-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./npm-cache:' > npm-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX} \
			@npm-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	for f in package.json package-lock.json; do \
		${MV} -f ${WRKSRC}/$${f} ${WRKSRC}/$${f}.bak; \
		${CP} -f ${PKGJSONSDIR}/$${f} ${WRKSRC}; \
	done
	${MV} ${WRKDIR}/npm-cache/node_modules ${WRKSRC}

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm_config_nodedir=${LOCALBASE} \
		${NPM_CMD} rebuild --no-progress
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_runtime=electron \
		npm_config_target=${ELECTRON_VER} \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		${NPM_CMD} rebuild --no-progress
	cd ${BUILD_WRKSRC}/desktop_native && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/resources/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/package.json ${STAGEDIR}${DATADIR}/resources

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${NPM_CMD} run test

.include <bsd.port.mk>
