PORTNAME=	astra
DISTVERSIONPREFIX=	v
DISTVERSION=	0.6.1-beta
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Audiophile desktop music player
WWW=		https://astramusic.dev/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

LIB_DEPENDS=	libasound.so:audio/alsa-lib
RUN_DEPENDS=	ffmpeg:multimedia/ffmpeg

USES=		electron:40 localbase:ldflags nodejs:24,build npm:npm \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	Boof2015

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder rebuild build:builder

post-extract:
	@if [ -f ${FILESDIR}/dot.env.local ]; then \
		${CP} ${FILESDIR}/dot.env.local ${WRKSRC}/.env.local; \
	fi

post-patch:
	@${REINPLACE_CMD} 's|/run/user|/var&|' \
		${WRKSRC}/src/main/services/discordRpc.ts

pre-build:
	cd ${WRKSRC} && \
	${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm run build:native
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	# generate icon files
	cd ${WRKSRC} && \
	${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=resources
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

post-build:
	${LN} -sf ${LOCALBASE}/bin/ffmpeg \
		${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffmpeg-static/ffmpeg
	@${MKDIR} ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffprobe-static/bin/freebsd/${ELECTRON_ARCH}
	${LN} -sf ${LOCALBASE}/bin/ffprobe \
		${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR}/resources/app.asar.unpacked/node_modules/ffprobe-static/bin/freebsd/${ELECTRON_ARCH}/ffprobe

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
	${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
