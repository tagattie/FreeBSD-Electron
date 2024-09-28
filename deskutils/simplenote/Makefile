PORTNAME=	simplenote
DISTVERSIONPREFIX=	v
DISTVERSION=	2.22.2
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Simplenote React app packaged via Electron
WWW=		https://simplenote.com

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:30 gmake localbase:ldflags nodejs:20,build \
		python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Automattic
GH_PROJECT=	${PORTNAME}-electron

USE_XORG=	x11 xau xdmcp xkbfile

BINARY_ALIAS=	git=${FALSE}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md RELEASE-NOTES.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:nodejs build:builder

NPM_INSTALL_FLAGS_FETCH=	--ignore-scripts --no-progress --no-audit \
				--no-fund --legacy-peer-deps

post-extract:
	if [ -f ${FILESDIR}/config-local.json ]; then \
		${CP} ${FILESDIR}/config-local.json ${WRKSRC}; \
	fi

post-patch:
	${REINPLACE_CMD} -e 's/make build/${MAKE_CMD} build/' ${WRKSRC}/Makefile

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${MAKE_CMD} build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/images/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${MAKE_CMD} test

.include <bsd.port.mk>
