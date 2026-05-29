PORTNAME=	marktext
DISTVERSIONPREFIX=	v
DISTVERSION=	0.19.0
CATEGORIES=	editors

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Simple and elegant markdown editor
WWW=		https://marktext.me/

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	rg:textproc/ripgrep
LIB_DEPENDS=	libpcre2-8.so:devel/pcre2 \
		libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:42 gnome nodejs:24,build pkgconfig \
		python:build xorg

USE_GITHUB=	yes

USE_XORG=	x11 xau xcb xdmcp xkbfile
USE_GNOME=	glib20

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder prefetch extract rebuild build:builder

pre-build:
	@${MKDIR} ${WRKSRC}/node_modules/@vscode/ripgrep-${OPSYS:tl}-${ELECTRON_ARCH}/bin
	${CP} ${LOCALBASE}/bin/rg \
		${WRKSRC}/node_modules/@vscode/ripgrep-${OPSYS:tl}-${ELECTRON_ARCH}/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm exec patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run minify-locales
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm exec electron-rebuild
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm exec electron-vite build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} \
		${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${WRKSRC}/build/linux/${PORTNAME}.desktop \
		${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}/${PORTNAME}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test

.include <bsd.port.mk>
