PORTNAME=	joplin
DISTVERSIONPREFIX=	v
DISTVERSION=	2.13.11
CATEGORIES=	deskutils
PKGNAMESUFFIX=	-desktop

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

USES=		cargo electron:26 gmake localbase:ldflags nodejs:18,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	laurent22
GH_TUPLE=	rollup:rollup:v4.9.1:rollup/rollup

CARGO_CARGOTOML=${WRKSRC}/rollup/rust/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/rollup/rust/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

BINARY_ALIAS=	python=${PYTHON_CMD} \
		python3=${PYTHON_CMD}

SUB_FILES=	${PORTNAME}${PKGNAMESUFFIX}

BUILD_WRKSRC=	${WRKSRC}/packages/app-desktop
TEST_WRKSRC=	${WRKSRC}/packages/app-desktop

PORTDOCS=	README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:berry prefetch extract build:builder

PREFETCH_TIMESTAMP=	1703591426

post-patch:
	${RM} -r ${WRKSRC}/packages/app-cli \
		${WRKSRC}/packages/app-clipper \
		${WRKSRC}/packages/app-mobile

pre-build:
	cd ${WRKSRC}/rollup/rust && \
		${SETENV} ${MAKE_ENV} ${CARGO} build --release --verbose --verbose
	${CP} ${WRKSRC}/rollup/rust/target/release/libbindings_napi.so \
		${WRKSRC}/packages/turndown/node_modules/rollup/dist/rollup.freebsd-${ELECTRON_ARCH}.node
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
		yarn rebuild
	cd ${BUILD_WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
		yarn run electron-rebuild --force-abi 116

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}${PKGNAMESUFFIX}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 72 96 128 144 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${BUILD_WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${BUILD_WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	cd ${STAGEDIR}${DATADIR}/resources && \
		${FIND} . -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ':' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test

.include <bsd.port.mk>
