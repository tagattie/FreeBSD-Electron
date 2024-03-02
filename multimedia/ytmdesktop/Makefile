PORTNAME=	ytmdesktop
DISTVERSIONPREFIX=	v
DISTVERSION=	2.0.2
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Desktop app for YouTube Music
WWW=		https://ytmdesktop.app/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}

USES=		electron:28 localbase:ldflags nodejs:18,build python:build

USE_GITHUB=	yes

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn4 prefetch extract rebuild:electron build:forge

pre-build:
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=ytmd.icns --out=icons --format=set --root=src/assets/icons
.for size in 256 512
	${MV} ${WRKSRC}/icons/ytmd_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/out/"YouTube Music Desktop App-linux-${ELECTRON_ARCH}" && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
