PORTNAME=	feishin
DISTVERSIONPREFIX=	v
DISTVERSION=	1.15.0
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Modern self-hosted music player
WWW=		https://feishin.vercel.app/ \
		https://github.com/jeffvli/feishin

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		electron:41 npm:pnpm

USE_GITHUB=	yes
GH_ACCOUNT=	jeffvli

PORTDOCS=	README.md
SUB_FILES=	${PORTNAME}

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder rebuild build:builder

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 72 96 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/assets/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
	${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
