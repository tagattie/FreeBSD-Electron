PORTNAME=	joplin
DISTVERSIONPREFIX=	v
DISTVERSION=	2.9.17
CATEGORIES=	deskutils
PKGNAMESUFFIX=	-desktop
DIST_SUBDIR=	${PORTNAME}${PKGNAMESUFFIX}

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Note taking and to-do application with synchronisation capabilities
WWW=		https://joplinapp.org

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder \
		rsync:net/rsync \
		npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libvips.so:graphics/vips \
		libsecret-1.so:security/libsecret

USES=		electron:19 gmake localbase:ldflags nodejs:16,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22

BINARY_ALIAS=	python=${PYTHON_CMD} \
		python3=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}${PKGNAMESUFFIX}

BUILD_WRKSRC=	${WRKSRC}/packages/app-desktop
TEST_WRKSRC=	${WRKSRC}/packages/app-desktop

PORTDOCS=	BUILD.md CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:berry prefetch extract rebuild:nodejs build:builder

PREFETCH_TIMESTAMP=	1678340740
YARN_VER=	3.1.1

post-patch:
	${RM} -r ${WRKSRC}/packages/app-cli \
		${WRKSRC}/packages/app-clipper \
		${WRKSRC}/packages/app-mobile

pre-build:
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		yarn run electron-rebuild --force-abi 89

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}${PKGNAMESUFFIX}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 24 32 48 72 96 128 144 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.mk>
