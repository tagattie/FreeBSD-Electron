# $FreeBSD$

PORTNAME=	mattermost-desktop
DISTVERSION=	4.3.2
CATEGORIES=	net-im

MAINTAINER=	tagattie@yandex.com
COMMENT=	Mattermost desktop application

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	7za:archivers/p7zip \
		app-builder:devel/app-builder

USES=		electron:5 gnome node:12,build

USE_GITHUB=	yes
GH_ACCOUNT=	mattermost
GH_PROJECT=	desktop

INSTALLS_ICONS=	yes

SUB_FILES=	mattermost-desktop
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	CHANGELOG.md CONTRIBUTING.md NOTICE.txt README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild

PREFETCH_TIMESTAMP=	1581415297
UPSTREAM_ELECTRON_VER=	5.0.11
UPSTREAM_CHROMEDRIVER_VER=	4.0.0

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run extract-dict

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${NPX_CMD} cross-env NODE_ENV=production \
			npm-run-all check-build-config build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		app-builder icon --input=icon.icns --out=icons \
			--format=set --root=resources
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${NPX_CMD} electron-builder --linux --dir \
		--config.npmRebuild=false \
		--config.electronVersion=${ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
.for size in 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
