PORTNAME=	webcord
DISTVERSIONPREFIX=	v
DISTVERSION=	4.10.5
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Discord and Fosscord Electron-based client implemented without Discord API
WWW=		https://github.com/SpacingBat3/WebCord

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		electron:35 nodejs:22,build

USE_GITHUB=	yes
GH_ACCOUNT=	SpacingBat3
GH_PROJECT=	WebCord

SUB_FILES=	${PORTNAME}

USE_ELECTRON=	npm:npm appbuilder prefetch extract rebuild build:forge

MAKE_ENV+=	WEBCORD_BUILD=release \
		WEBCORD_UPDATE_NOTIFICATIONS=false

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=app.icns --out=icons --format=set --root=sources/assets/icons
.for size in 256 512
	${MV} ${WRKSRC}/icons/app_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor
	# copy electron dist zip file to ${WRKSRC} for electron-forge
	${CP} ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}/electron-v${UPSTREAM_ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip \
		${WRKSRC}

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/out/release/WebCord-linux-${ELECTRON_ARCH} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
