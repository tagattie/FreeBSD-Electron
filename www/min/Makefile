PORTNAME=	min
DISTVERSIONPREFIX=	v
DISTVERSION=	1.32.1
CATEGORIES=	www

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Fast, minimal browser that protects your privacy
WWW=		https://minbrowser.org

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

BUILD_DEPENDS=	app-builder:devel/app-builder
LIB_DEPENDS=	libsecret-1.so:security/libsecret

USES=		desktop-file-utils electron:29 nodejs:20,build pkgconfig \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	minbrowser

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm prefetch extract rebuild build:packager

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

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
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
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons-out/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/app/Min-linux-${ELECTRON_ARCH} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
