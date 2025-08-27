# Notes for port maintainer
#
# Before copying package.json and yarn.lock to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ corepack yarn add --dev --mode=skip-build node-addon-api node-gyp

PORTNAME=	waveterm
DISTVERSIONPREFIX=	v
DISTVERSION=	0.11.4
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Open-source, cross-platform terminal for seamless workflows
WWW=		https://www.waveterm.dev/

LICENSE=	APACHE20
LICENSE_FILE=	${WRKSRC}/LICENSE

BUILD_DEPENDS=	task:devel/task
LIB_DEPENDS=	libvips.so:graphics/vips

USES=		cargo electron:37 gmake go:modules,no_targets nodejs:22,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	wavetermdev
GH_TUPLE=	swc-project:swc:v1.13.3:swc/swc

CARGO_CARGOTOML=${WRKSRC}/swc/bindings/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/swc/bindings/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

GO_MODULE=	github.com/wavetermdev/waveterm

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PLIST_SUB=	ARCH=${ARCH:S/aarch64/arm64/:S/amd64/x64/} \
		DISTVERSION=${DISTVERSION}
PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn4 appbuilder:devel prefetch extract rebuild build:builder

ELECTRON_MAKE_FLAGS+=	-c electron-builder.config.cjs

pre-build:
	cd ${WRKSRC}/swc/bindings && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} CARGO_FEATURE_LOCAL_DYNAMIC_TLS=1 \
		${CARGO} build --manifest-path ${CARGO_CARGOTOML} \
		--package binding_core_node --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/release/libbinding_core_node.so \
		${WRKSRC}/node_modules/@swc/core/swc.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${GO_ENV} task --verbose build:backend
	cd ${WRKSRC}/node_modules/sharp && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} npm run install
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:prod
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/make/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
