PORTNAME=	webcord
DISTVERSIONPREFIX=	v
DISTVERSION=	4.2.0
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Discord and Fosscord Electron-based client implemented without Discord API
WWW=		https://github.com/SpacingBat3/WebCord

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		git:devel/git

USES=		electron:24 nodejs:18,build

USE_GITHUB=	yes
GH_ACCOUNT=	SpacingBat3
GH_PROJECT=	WebCord

SUB_FILES=	${PORTNAME}

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:forge

PREFETCH_TIMESTAMP=	1682148119
MAKE_ENV+=	WEBCORD_BUILD=release \
		WEBCORD_UPDATE_NOTIFICATIONS=false

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=app.icns --out=icons --format=set --root=sources/assets/icons
	${MV} ${WRKSRC}/icons/app_512.png ${WRKSRC}/icons/icon_512x512.png

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/out/release/WebCord-linux-x64 && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
