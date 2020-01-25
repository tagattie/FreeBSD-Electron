# $FreeBSD$

PORTNAME=	joplin-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.0.178
CATEGORIES=	deskutils

MAINTAINER=	tagattie@yandex.com
COMMENT=	Open source note taking and to-do application with synchronisation capabilities

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

EXTRACT_DEPENDS=	rsync:net/rsync
BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils gnome localbase:ldflags python:2.7,build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22
GH_PROJECT=	${PORTNAME:S/-desktop//}

INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	joplin-desktop
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	BUILD.md CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE= DOCS

USE_NODE=	10:npm
USE_ELECTRON=	7
USE_ELECTRON_HELPER=	fetch extract build

PREFETCH_TIMESTAMP=	1579580332
SYSTEM_ELECTRON_VER=	${ELECTRON_VER}
PKG_ELECTRON_VER=	7.1.9

post-extract:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run copyLib

pre-build:
	# manually run npm postinstall
	cd ${WRKSRC}/ElectronClient/app && \
		${SETENV} ${MAKE_ENV} ${NODE_CMD} compile.js && \
		${SETENV} ${MAKE_ENV} ${NODE_CMD} compile-package-info.js && \
		${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		${NPX_CMD} electron-rebuild -f --version ${SYSTEM_ELECTRON_VER}

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run tsc
	cd ${WRKSRC}/ElectronClient/app && ${SETENV} ${MAKE_ENV} \
		USE_SYSTEM_APP_BUILDER=true \
		${NPX_CMD} electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${SYSTEM_ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 24 32 48 72 96 128 144 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/ElectronClient/app/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/ElectronClient/app/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR} -type f -name 'package*.json.bak' -delete

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include "${.CURDIR}/../../devel/electron4/bsd.electron.mk"
.include <bsd.port.mk>
