PORTNAME=	museeks
PORTVERSION=	0.12.0
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Simple, clean and cross-platform music player

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:13 gmake localbase:ldflags \
		node:14,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	martpie

SUB_FILES=	museeks

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1638325143

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/256x256/apps
	${INSTALL_DATA} ${WRKSRC}/src/images/logos/museeks.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/256x256/apps/${PORTNAME}.png
.for size in 32 48 64 128
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/src/images/logos/museeks-${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/build/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
