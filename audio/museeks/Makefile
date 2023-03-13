PORTNAME=	museeks
PORTVERSION=	0.13.1
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Simple, clean and cross-platform music player
WWW=		https://museeks.io

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		cargo electron:18 gmake localbase:ldflags nodejs:16,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	martpie
GH_TUPLE=	parcel-bundler:source-map:v2.1.1:source_map/source-map

CARGO_CARGOTOML=${WRKSRC}/source-map/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/source-map/Cargo.lock
CARGO_BUILD=    no
CARGO_INSTALL=  no
CARGO_TEST=     no

SUB_FILES=	museeks

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn prefetch extract rebuild:electron build:builder

PREFETCH_TIMESTAMP=	1676201522

pre-build:
	cd ${WRKSRC}/source-map && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} cargo build --release --verbose --verbose
	${CP} ${WRKDIR}/target/x86_64-unknown-freebsd/release/libparcel_sourcemap_node.so \
		${WRKSRC}/node_modules/@parcel/source-map/parcel_sourcemap_node/artifacts/index.freebsd-x64.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/256x256/apps
	${INSTALL_DATA} ${WRKSRC}/src/images/logos/museeks.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/256x256/apps/${PORTNAME}.png
.for size in 32 48 64 128
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/src/images/logos/museeks-${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/build/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn test:unit

.include <bsd.port.mk>
