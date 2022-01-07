PORTNAME=	mattermost-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	5.0.2
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Mattermost desktop application

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	7za:archivers/p7zip \
		app-builder:devel/app-builder \
		gifsicle:graphics/gifsicle \
		cjpeg:graphics/mozjpeg \
		optipng:graphics/optipng \
		pngquant:graphics/pngquant \
		cwebp:graphics/webp

USES=		desktop-file-utils electron:14 node:14,build

USE_GITHUB=	yes
GH_ACCOUNT=	mattermost
GH_PROJECT=	desktop

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md NOTICE.txt README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1640938848

post-configure:
	${MKDIR} ${WRKSRC}/node_modules/cwebp-bin/vendor
	${CP} ${LOCALBASE}/bin/cwebp ${WRKSRC}/node_modules/cwebp-bin/vendor
	${MKDIR} ${WRKSRC}/node_modules/gifsicle/vendor
	${CP} ${LOCALBASE}/bin/gifsicle ${WRKSRC}/node_modules/gifsicle/vendor
	${MKDIR} ${WRKSRC}/node_modules/mozjpeg/vendor
	${CP} ${LOCALBASE}/bin/cjpeg ${WRKSRC}/node_modules/mozjpeg/vendor
	${MKDIR} ${WRKSRC}/node_modules/optipng-bin/vendor
	${CP} ${LOCALBASE}/bin/optipng ${WRKSRC}/node_modules/optipng-bin/vendor
	${MKDIR} ${WRKSRC}/node_modules/pngquant-bin/vendor
	${CP} ${LOCALBASE}/bin/pngquant ${WRKSRC}/node_modules/pngquant-bin/vendor

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${NPX_CMD} cross-env NODE_ENV=production npm-run-all check-build-config build-prod
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=src/assets
.for size in 1024
	${MV} ${WRKSRC}/icons/icon_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${NPM_CMD} run test

.include <bsd.port.mk>
