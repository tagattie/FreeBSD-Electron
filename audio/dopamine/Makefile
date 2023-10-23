PORTNAME=	dopamine
DISTVERSIONPREFIX=	v
DISTVERSION=	3.0.0-preview20
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Audio player that keeps it simple
WWW=		https://github.com/digimezzo/dopamine

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		electron:21 nodejs:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	digimezzo

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract build:builder

PREFETCH_TIMESTAMP=	1697748196
ELECTRON_MAKE_FLAGS+=	--config electron-builder.config.js

post-patch:
	${REINPLACE_CMD} -e 's/OS == "linux"/& or OS == "freebsd"/' \
		${WRKSRC}/node_modules/register-scheme/binding.gyp

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run postinstall:electron
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx ngcc
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build:prod
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		./node_modules/.bin/electron-builder install-app-deps --platform linux
	# electron-builder install-app-deps installs prebuilt binary for linux
	# so force rebuild binary for FreeBSD
	cd ${WRKSRC}/node_modules/better-sqlite3 && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm run build-release

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 96 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/static/icons/${size}x${size}.png \
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
