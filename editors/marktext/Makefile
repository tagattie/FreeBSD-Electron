# $FreeBSD$

PORTNAME=	marktext
DISTVERSIONPREFIX=	v
DISTVERSION=	0.15.1
CATEGORIES=	editors

MAINTAINER=	tagattie@yandex.com
COMMENT=	Simple and elegant markdown editor

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		rg:textproc/ripgrep
LIB_DEPENDS=	libpcre2-8.so:devel/pcre2 \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:5 gnome node:12,build pkgconfig \
		python:2.7,build xorg

USE_GITHUB=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

USE_XORG=	x11 xau xcb xdmcp xkbfile
USE_GNOME=	glib20
INSTALLS_ICONS=	yes

SUB_FILES=	${PORTNAME}
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn
USE_ELECTRON=	prefetch extract prebuild build:builder

MAKE_ENV+=	MARKTEXT_IS_STABLE=1
PREFETCH_TIMESTAMP=	1582176191
UPSTREAM_ELECTRON_VER=	5.0.11
UPSTREAM_CHROMEDRIVER_VER=	5.0.0

pre-build:
	${MKDIR} ${WRKSRC}/node_modules/vscode-ripgrep/bin
	${CP} ${LOCALBASE}/bin/rg ${WRKSRC}/node_modules/vscode-ripgrep/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NODE_CMD} .electron-vue/build.js

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${WRKSRC}/resources/linux/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 24 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/icons/${size}x${size}/${PORTNAME}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/build/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
