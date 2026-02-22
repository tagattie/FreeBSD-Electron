PORTNAME=	gerbil
DISTVERSIONPREFIX=	v
DISTVERSION=	1.19.2
CATEGORIES=	misc

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Desktop app for running Large Language Models locally
WWW=		https://github.com/lone-cloud/gerbil

LICENSE=	AGPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

RUN_DEPENDS=	koboldcpp:misc/koboldcpp

USES=		electron:38 nodejs:22,build

USE_GITHUB=	yes
GH_ACCOUNT=	lone-cloud

USE_ELECTRON=	npm:yarn4 appbuilder prefetch extract build:builder

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=assets
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${WRKSRC}/assets/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
	${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
