# $FreeBSD$

PORTNAME=	simplenote
DISTVERSIONPREFIX=	v
DISTVERSION=	1.12.0
CATEGORIES=	deskutils

MAINTAINER=	tagattie@yandex.com
COMMENT=	Simplenote React app packaged via Electron

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder2 \
		git:devel/git

USES=		desktop-file-utils gmake gnome localbase:ldflags \
		python:2.7,build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Automattic
GH_PROJECT=	${PORTNAME}-electron

USE_XORG=	x11 xau xdmcp xkbfile
INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	simplenote
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	RELEASE-NOTES.txt

OPTIONS_DEFINE=	DOCS

USE_NODE=	10:npm
USE_ELECTRON=	4
USE_ELECTRON_HELPER=	fetch extract build

PREFETCH_TIMESTAMP=	1579333031
PKG_ELECTRON_VER=	4.2.11

post-extract:
	if [ -f ${FILESDIR}/config.json ]; then \
		${CP} ${FILESDIR}/config.json ${WRKSRC}; \
	fi

pre-patch:
	${PATCH} -p0 -d ${WRKSRC} < ${WRKSRC}/resources/macos/macPackager-patch.diff
	${PATCH} -p0 -d ${WRKSRC} < ${WRKSRC}/resources/macos/scheme-patch.diff

post-patch:
	${REINPLACE_CMD} -e 's/make build/${MAKE_CMD} build/' ${WRKSRC}/Makefile
	${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/node_modules/@paulcbetts/spellchecker/binding.gyp
	${REINPLACE_CMD} -e 's/needflag = NULL/needflag = FLAG_NULL/' \
		${WRKSRC}/node_modules/@paulcbetts/spellchecker/vendor/hunspell/src/hunspell/affentry.hxx

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${MAKE_CMD} build
	# rebuild native modules for electron using electron-rebuild
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		${NPX_CMD} electron-rebuild -f --version ${ELECTRON_VER}
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${NPX_CMD} electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}

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

.include "${.CURDIR}/../../devel/electron4/bsd.electron.mk"
.include <bsd.port.mk>
