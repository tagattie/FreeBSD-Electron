PORTNAME=	nuclear
DISTVERSIONPREFIX=	v
DISTVERSION=	0.6.47
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Streaming music player that finds free music for you
WWW=		https://nuclearplayer.com/

LICENSE=	AGPLv3+
LICENSE_FILE=	${WRKSRC}/LICENSE

RUN_DEPENDS=	fpcalc:audio/chromaprint \
		ffmpeg:multimedia/ffmpeg

USES=		cargo electron:33 localbase:ldflags nodejs:20,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	nukeop

CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md LEGAL.md PRIVACY_POLICY.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm appbuilder prefetch extract rebuild build:builder

ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.main=dist/main.js

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx lerna run build --scope @nuclear/scanner
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npx lerna run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}
	${LN} -sf ${LOCALBASE}/bin/fpcalc ${STAGEDIR}${DATADIR}/resources/bin/fpcalc
	${LN} -sf ${LOCALBASE}/bin/ffmpeg ${STAGEDIR}${DATADIR}/resources/bin/ffmpeg

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
