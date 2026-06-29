PORTNAME=	pear-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	3.12.0
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Extension for music player
WWW=		https://github.com/pear-devs/pear-desktop

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/license

USES=		electron:42 nodejs:24,build npm:pnpm

USE_GITHUB=	yes
GH_ACCOUNT=	pear-devs

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md changelog.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder rebuild build:builder

NPM_VER=	11.9.0

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
