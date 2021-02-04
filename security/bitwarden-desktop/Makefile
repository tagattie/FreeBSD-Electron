# $FreeBSD$

PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.17.1
CATEGORIES=	security
MASTER_SITES=	https://github.com/tagattie/freebsd-ports/releases/download/${PORTNAME}-${DISTVERSION}/:webfonts
DISTFILES=	${PORTNAME}-webfonts-${DISTVERSION}${EXTRACT_SUFX}:webfonts

MAINTAINER=	tagattie@yandex.com
COMMENT=	Bitwarden desktop application

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:6 gnome localbase:ldflags \
		node:10,build pkgconfig python:2.7,build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	desktop
GH_TUPLE=	bitwarden:jslib:0a30c7eb1ecbac500e6c55a7d4024d98efa982bc:jslib/jslib

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20
INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1584942273

post-extract:
	${MV} ${WRKDIR}/css ${WRKSRC}/src

post-patch:
	${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/node_modules/desktop-idle/binding.gyp

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

# helper target for port maintainer(s)
make-webfonts:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPX_CMD} gulp webfonts
	cd ${WRKSRC}/src && ${TAR} -czf \
		${WRKDIR}/${PORTNAME}-webfonts-${DISTVERSION}${EXTRACT_SUFX} css

.include <bsd.port.mk>
