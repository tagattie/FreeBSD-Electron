PORTNAME=	standardnotes
DISTVERSIONPREFIX=	@standardnotes/desktop@
DISTVERSION=	3.196.7
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	End-to-end encrypted notes app for digitalists and professionals
WWW=		https://standardnotes.com

LICENSE=	AGPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	bash:shells/bash \
		npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libsecret-1.so:security/libsecret

USE_GITHUB=	yes
GH_PROJECT=	app

WRKSRC=		${WRKDIR}/app--${PORTNAME}-desktop-${DISTVERSION}
BUILD_WRKSRC=	${WRKSRC}/packages/desktop

USES=		desktop-file-utils electron:35 gmake localbase:ldflags \
		nodejs:22,build pkgconfig python:build

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn2 appbuilder extract build:builder

NPM_VER=	3.2.1
NPM_CACHE_SETUP_CMD=	${TRUE}
REBUILD_WRKSRC_ELECTRON=	${BUILD_WRKSRC}
ELECTRON_MAKE_FLAGS+=	--c.extraMetadata.version=${DISTVERSION}

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:desktop
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn exec webpack --config desktop.webpack.prod.js
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		yarn rebuild

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.iconset/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}@2/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.iconset/icon_${size}x${size}@2x.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}@2/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
