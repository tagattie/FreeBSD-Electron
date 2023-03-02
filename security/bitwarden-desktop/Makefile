PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	desktop-v
DISTVERSION=	2023.2.0
CATEGORIES=	security

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Bitwarden desktop application
WWW=		https://bitwarden.com

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:21 gmake gnome \
		localbase:ldflags nodejs:16,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	clients

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20

CARGO_CARGOTOML=${BUILD_WRKSRC}/desktop_native/Cargo.toml
CARGO_CARGOLOCK=${BUILD_WRKSRC}/desktop_native/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

MAKE_ENV=	${CARGO_ENV}

SUB_FILES=	${PORTNAME}

BUILD_WRKSRC=	${WRKSRC}/apps/desktop

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:builder

PREFETCH_TIMESTAMP=	1677016857

pre-build:
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	cd ${BUILD_WRKSRC}/desktop_native && ${SETENV} ${MAKE_ENV} npm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/resources/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/package.json ${STAGEDIR}${DATADIR}/resources

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${NPM_CMD} run test

.include <bsd.port.mk>
