# Notes for port maintainer
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ npm install --save-dev --ignore-scripts node-addon-api node-gyp

PORTNAME=	ueli
DISTVERSIONPREFIX=	v
DISTVERSION=	9.25.1
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Cross-platform keystroke launcher
WWW=		https://ueli.app/

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

LIB_DEPENDS=	libvips.so:graphics/vips

USES=		electron:37 localbase:ldflags nodejs:22,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	oliverschwendener

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md PRIVACY_STATEMENT README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm appbuilder:devel prefetch extract rebuild build:builder

ELECTRON_MAKE_FLAGS+=	--config electron-builder.config.js

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/0x0/apps
	${INSTALL_DATA} ${WRKSRC}/assets/Build/app-icon-dark.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/0x0/apps/${PORTNAME}.png
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
