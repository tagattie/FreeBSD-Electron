# $FreeBSD$

PORTNAME=	simplenote
DISTVERSIONPREFIX=	v
DISTVERSION=	1.14.0
CATEGORIES=	deskutils

MAINTAINER=	tagattie@yandex.com
COMMENT=	Simplenote React app packaged via Electron

LICENSE=	GPLv2
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder2 \
		git:devel/git

USES=		desktop-file-utils electron:4 gmake gnome localbase:ldflags \
		node:10,build python:2.7,build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Automattic
GH_PROJECT=	${PORTNAME}-electron

USE_XORG=	x11 xau xdmcp xkbfile
INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	RELEASE-NOTES.txt

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1580359898
UPSTREAM_ELECTRON_VER=	4.2.11
UPSTREAM_CHROMEDRIVER_VER=	4.0.0

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

.include <bsd.port.mk>
