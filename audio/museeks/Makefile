# $FreeBSD$

PORTNAME=	museeks
PORTVERSION=	0.11.1
CATEGORIES=	audio

MAINTAINER=	tagattie@yandex.com
COMMENT=	Simple, clean and cross-platform music player

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder2

USES=		desktop-file-utils gnome localbase:ldflags python:2.7,build

USE_GITHUB=	yes
GH_ACCOUNT=	martpie

INSTALLS_ICONS= yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	museeks
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	10:npm
USE_ELECTRON=	4
USE_ELECTRON_HELPER=	fetch extract build

PREFETCH_TIMESTAMP=	1579840617
PKG_ELECTRON_VER=	4.1.1

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		${NPX_CMD} electron-rebuild -f --version ${ELECTRON_VER}
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${NPX_CMD} electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}

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

.include "${.CURDIR}/../../devel/electron4/bsd.electron.mk"
.include <bsd.port.mk>
