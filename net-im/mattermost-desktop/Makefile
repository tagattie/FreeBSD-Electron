PORTNAME=	mattermost-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	5.8.0
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Mattermost desktop application
WWW=		https://mattermost.com

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder \
		jq:textproc/jq

USES=		desktop-file-utils electron:29 nodejs:20,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	mattermost
GH_PROJECT=	desktop

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md NOTICE.txt README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild:electron build:builder

pre-build:
	${MKDIR} ${WRKSRC}/node_modules/node-jq/bin
	${CP} ${LOCALBASE}/bin/jq ${WRKSRC}/node_modules/node-jq/bin/jq
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build-prod
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=src/assets
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor
	# ensure native node modules for windows-focus-assist is built
	# electron-builder install-app-deps does not build this native module
	# in poudriere for some reason
	@cd ${WRKSRC}/node_modules/windows-focus-assist && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		npx node-gyp rebuild

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
