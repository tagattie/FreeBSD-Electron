PORTNAME=	stretchly
DISTVERSIONPREFIX=	v
DISTVERSION=	1.13.1
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Break time reminder app

LICENSE=	BSD2CLAUSE
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:22 localbase:ldconfig node:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	hovancik

SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md CONTRIBUTING.md README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1676189939

pre-build:
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${NPM_CMD} run test

.include <bsd.port.mk>
