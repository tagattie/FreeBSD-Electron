PORTNAME=	standardnotes
DISTVERSIONPREFIX=	@standardnotes/desktop@
DISTVERSION=	3.162.8
CATEGORIES=	deskutils
DIST_SUBDIR=	${PORTNAME}

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	End-to-end encrypted notes app for digitalists and professionals
WWW=		https://standardnotes.com

LICENSE=	AGPLv3
LICENSE_FILE=	${WRKSRC}/packages/desktop/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		bash:shells/bash \
		npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libsecret-1.so:security/libsecret

USE_GITHUB=	yes
GH_PROJECT=	app

WRKSRC=		${WRKDIR}/app--${PORTNAME}-desktop-${DISTVERSION}
BUILD_WRKSRC=	${WRKSRC}/packages/desktop

USES=		desktop-file-utils electron:22 gmake localbase:ldflags \
		nodejs:16,build pkgconfig python:build

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:berry extract rebuild build:builder

YARN_VER=	3.2.1
NPM_CACHE_SETUP_CMD=	${TRUE}
REBUILD_WRKSRC_ELECTRON=	${BUILD_WRKSRC}
ELECTRON_MAKE_FLAGS+=	--c.extraMetadata.version=${DISTVERSION}

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build:desktop
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} \
		yarn run webpack --config desktop.webpack.prod.js

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.iconset/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}@2/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icon.iconset/icon_${size}x${size}@2x.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}@2/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
