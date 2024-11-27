PORTNAME=	muffon
DISTVERSIONPREFIX=	v
DISTVERSION=	2.1.0
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Advanced multi-source music streaming + discovery client for desktop
WWW=		https://muffon.netlify.app/

LICENSE=	AGPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		cargo desktop-file-utils electron:31 nodejs:20,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	staniel359
GH_TUPLE=	rollup:rollup:v4.18.0:rollup/rollup

CARGO_CARGOTOML=${WRKSRC}/rollup/rust/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/rollup/rust/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder prefetch extract rebuild build:builder

NPM_VER=	9.12.1

post-extract:
	if [ -f ${FILESDIR}/dot.env ]; then \
		${CP} ${FILESDIR}/dot.env ${WRKSRC}/.env; \
	fi

post-patch:
	@${REINPLACE_CMD} -e 's/OS == "linux"/& or OS == "freebsd"/' \
		${WRKSRC}/node_modules/register-scheme/binding.gyp

pre-build:
	cd ${WRKSRC}/rollup/rust && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/release/libbindings_napi.so \
		${WRKSRC}/node_modules/rollup/dist/rollup.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=public/icons
.for size in 512
	${MV} ${WRKSRC}/icons/icon_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/build_electron/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
