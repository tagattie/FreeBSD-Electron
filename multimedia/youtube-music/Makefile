PORTNAME=	youtube-music
DISTVERSIONPREFIX=	v
DISTVERSION=	3.9.0
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	YouTube Music desktop app bundled with custom plugins
WWW=		https://th-ch.github.io/youtube-music

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/license

USES=		electron:34 nodejs:20,build

USE_GITHUB=	yes
GH_ACCOUNT=	th-ch

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md changelog.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder prefetch extract rebuild build:builder

NPM_VER=	10.10.0

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/assets/generated/icons/png/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/pack/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${CP} ${WRKSRC}/package.json ${STAGEDIR}${DATADIR}/resources

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test

.include <bsd.port.mk>
