PORTNAME=	youtube-music
DISTVERSIONPREFIX=	v
DISTVERSION=	1.20.0
CATEGORIES=	multimedia
DIST_SUBDIR=	${PORTNAME}

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	YouTube Music desktop app bundled with custom plugins
WWW=		https://th-ch.github.io/youtube-music

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/license

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:22 nodejs:16,build

USE_GITHUB=	yes
GH_ACCOUNT=	th-ch

SUB_FILES=	${PORTNAME}

PORTDOCS=	readme.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:berry prefetch extract build:builder

YARN_VER=	3.4.1
PREFETCH_TIMESTAMP=	1675838395

pre-build:
	# generate ad-blocker and  bypass-age-restrictions engines
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run plugins

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 128 256 512 1024
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

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.mk>
