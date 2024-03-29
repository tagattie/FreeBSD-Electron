PORTNAME=	simplenote
DISTVERSIONPREFIX=	v
DISTVERSION=	2.21.0
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Simplenote React app packaged via Electron
WWW=		https://simplenote.com

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder \
		git:devel/git

USES=		electron:12 gmake localbase:ldflags nodejs:14,build \
		python:2.7,build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Automattic
GH_PROJECT=	${PORTNAME}-electron

USE_XORG=	x11 xau xdmcp xkbfile

MAKE_ENV+=	npm_config_python=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md RELEASE-NOTES.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:nodejs build:builder

PREFETCH_TIMESTAMP=	1637129508

post-extract:
	if [ -f ${FILESDIR}/config.json ]; then \
		${CP} ${FILESDIR}/config.json ${WRKSRC}; \
	fi

post-patch:
	${REINPLACE_CMD} -e 's/make build/${MAKE_CMD} build/' ${WRKSRC}/Makefile

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${MAKE_CMD} build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/images/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${MAKE_CMD} test

.include <bsd.port.mk>
