PORTNAME=	youtube-music
DISTVERSIONPREFIX=	v
DISTVERSION=	1.17.0
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	YouTube Music desktop app bundled with custom plugins

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/license

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:17 magick:build node:16,build

USE_GITHUB=	yes
GH_ACCOUNT=	th-ch

SUB_FILES=	${PORTNAME}

PORTDOCS=	readme.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn
USE_ELECTRON=	prefetch extract build:builder

PREFETCH_TIMESTAMP=	1654151111

pre-build:
	# generate icon files
	cd ${WRKSRC}/assets && ${MKDIR} generated/icons/png
.for size in 16 24 32 48 64 128 256 512 1024
	convert -resize ${size}x${size} ${WRKSRC}/assets/youtube-music.png \
		${WRKSRC}/assets/generated/icons/png/${size}x${size}.png
.endfor
	# generate ad-blocker engine
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run plugins

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/assets/generated/icons/png/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
