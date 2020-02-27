# $FreeBSD$

PORTNAME=	joplin
DISTVERSIONPREFIX=	v
DISTVERSION=	1.0.185
CATEGORIES=	deskutils
PKGNAMESUFFIX=	-desktop

MAINTAINER=	tagattie@yandex.com
COMMENT=	Note taking and to-do application with synchronisation capabilities

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder \
		rsync:net/rsync

USES=		desktop-file-utils electron:7 gnome localbase:ldflags \
		node:12,build python:2.7,build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22

INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}${PKGNAMESUFFIX}
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	BUILD.md CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1582702267

BUILD_WRKSRC=	${WRKSRC}/ElectronClient

pre-build:
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}${PKGNAMESUFFIX}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 24 32 48 72 96 128 144 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/ElectronClient/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/ElectronClient/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	# clean up backup files
	${FIND} ${STAGEDIR}${DATADIR} -type f \( -name '*.bak' -o -name '*.orig' \) -delete

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
