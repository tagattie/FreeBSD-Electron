PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	desktop-v
DISTVERSION=	2022.6.0
CATEGORIES=	security

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Bitwarden desktop application

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:16 gmake gnome localbase:ldflags \
		node:16,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	clients

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1657090372

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

pre-build:
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

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

.include <bsd.port.mk>
