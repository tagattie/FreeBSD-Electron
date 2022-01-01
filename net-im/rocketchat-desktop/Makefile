# $FreeBSD$

PORTNAME=	rocketchat-desktop
PORTVERSION=	2.17.7
CATEGORIES=	net-im

MAINTAINER=	tagattie@yandex.com
COMMENT=	Rocket.Chat desktop client

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		${LOCALBASE}/libdata/pkgconfig/vips.pc:graphics/vips

USES=		electron:7 gnome node:12,build python:2.7,build

USE_GITHUB=	yes
GH_ACCOUNT=	RocketChat
GH_PROJECT=	Rocket.Chat.Electron

BINARY_ALIAS=	python=${PYTHON_CMD}

INSTALLS_ICONS=	yes

SUB_FILES=	rocketchat-desktop
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	CHANGELOG.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn
USE_ELECTRON=	prefetch extract prebuild

PREFETCH_TIMESTAMP=	1581576656

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} run gulp build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		app-builder icon --input=icon.icns --out=icons \
			--format=set --root=build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} run electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR} \
		--config.productName='rocketchat'

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
.for size in 48
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
