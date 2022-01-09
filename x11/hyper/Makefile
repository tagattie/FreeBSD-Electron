PORTNAME=	hyper
DISTVERSIONPREFIX=	v
DISTVERSION=	3.1.5
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Terminal built on web technologies

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:14 localbase:ldflags node:14,build \
		python:build shebangfix

USE_GITHUB=	yes
GH_ACCOUNT=	vercel

SHEBANG_FILES=	build/linux/${PORTNAME}

SUB_FILES=	${PORTNAME}-terminal

PORTDOCS=	PLUGINS.md README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	yarn
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1641708296

post-extract:
	${MKDIR} ${WRKSRC}/target

post-patch:
	${REINPLACE_CMD} -e 's/make/g&/' \
		${WRKSRC}/node_modules/lzma-native/liblzma-build.sh

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} run webpack --config-name hyper-app
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} run cpy --cwd=target --parents "node_modules/**/*" "../app/"
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		${YARN_CMD} run cross-env BABEL_ENV=production babel target/renderer/bundle.js \
			--out-file target/renderer/bundle.js --no-comments --minified
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}-terminal ${STAGEDIR}${PREFIX}/bin
	${INSTALL_SCRIPT} ${WRKSRC}/build/linux/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR} -type f -name '*.orig' -delete

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${YARN_CMD} test

.include <bsd.port.mk>
