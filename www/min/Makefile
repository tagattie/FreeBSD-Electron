PORTNAME=	min
DISTVERSIONPREFIX=	v
DISTVERSION=	1.22.2
CATEGORIES=	www

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Fast, minimal browser that protects your privacy

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:15 node:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	minbrowser

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:packager

PREFETCH_TIMESTAMP=	1641456118
ELECTRON_MAKE_FLAGS+=	--asar \
			--ignore='.DS_Store' \
			--ignore='dist/app' \
			--ignore='/\.map$$/g' \
			--ignore='/\.md$$/g' \
			--ignore='node_modules/electron-installer-debian' \
			--ignore='node_modules/electron-installer-common' \
			--ignore='node_modules/electron-installer-redhat' \
			--ignore='icons/source' \
			--ignore='icons/icon.icns' \
			--ignore='icons-out/' \
			--ignore='localization/' \
			--ignore='node_modules/@types/' \
			--ignore='node_modules/pdfjs-dist/es5' \
			--ignore='node_modules/pdfjs-dist/lib' \
			--ignore='/node_modules\/[^/\n]+\/test\//g' \
			--app-version='${DISTVERSION}' \
			--out='dist/app'

post-patch:
	${REINPLACE_CMD} -e 's/make/g&/' \
		${WRKSRC}/node_modules/lzma-native/liblzma-build.sh

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons-out --format=set --root=icons
.for size in 16 48
	${MV} ${WRKSRC}/icons-out/icon_${size}x${size}.png ${WRKSRC}/icons-out/icon_${size}.png
.endfor
	# remove backup files
	${FIND} ${WRKSRC} -type f \( -name '*.bak' -o -name '*.orig' \) -delete

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons-out/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/app/Min-linux-x64 && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} ${NPM_CMD} run test

.include <bsd.port.mk>
