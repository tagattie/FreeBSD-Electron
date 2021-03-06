# $FreeBSD$

PORTNAME=	ytmdesktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.13.0
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Desktop app for YouTube Music

LICENSE=	CC0-1.0
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:10 gnome localbase:ldflags \
		node:12,build python:build

USE_GITHUB=	yes

INSTALLS_ICONS=	yes

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1613546029
ELECTRON_MAKE_FLAGS+=	--config electron-builder64.yml

post-patch:
	${REINPLACE_CMD} -e '1 s/!defined(__linux__)/& \&\& !defined(__FreeBSD__)/' \
		${WRKSRC}/node_modules/abstract-socket/src/abstract_socket.cc

pre-build:
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=favicon.icns --out=icons --format=set --root=src/assets

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
	${INSTALL_DATA} ${WRKSRC}/icons/favicon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
