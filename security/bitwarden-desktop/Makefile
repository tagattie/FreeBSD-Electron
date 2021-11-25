PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.29.1
CATEGORIES=	security
MASTER_SITES=	https://github.com/tagattie/FreeBSD-Electron/releases/download/${PORTNAME}-${DISTVERSION}/:npm_cache
DISTFILES=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}:npm_cache

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Bitwarden desktop application

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:14 gmake gnome localbase:ldflags \
		node:14,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	desktop
GH_TUPLE=	bitwarden:jslib:764dc40b36e0000807e59b8d6feea5ac4577270d:jslib/jslib

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prebuild build:builder

post-extract:
	${MV} ${WRKDIR}/node_modules ${WRKSRC}

post-patch:
	${REINPLACE_CMD} -e 's/make/g&/' \
		${WRKSRC}/node_modules/lzma-native/liblzma-build.sh

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
