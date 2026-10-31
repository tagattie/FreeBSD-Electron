PORTNAME=	ytmdesktop
DISTVERSIONPREFIX=	v
DISTVERSION=	2.1.0
CATEGORIES=	multimedia

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Desktop app for YouTube Music
WWW=		https://ytmdesktop.app/

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		cargo electron:45 localbase:ldflags nodejs:24,build npm:pnpm \
		python:build

USE_GITHUB=	yes
GH_TUPLE=	electron:extract-zip:v1.0.5:extract_zip/extract-zip \
		NovusTheory:xosms:v0.7.0-rc.2:xosms/xosms

CARGO_CARGOTOML_EXTRACT_ZIP=	${WRKSRC}/extract-zip/Cargo.toml
CARGO_CARGOLOCK_EXTRACT_ZIP=	${WRKSRC}/extract-zip/Cargo.lock
CARGO_CARGOTOML_XOSMS=		${WRKSRC}/xosms/Cargo.toml
CARGO_CARGOLOCK_XOSMS=		${WRKSRC}/xosms/Cargo.lock
CARGO_CARGOTOML=		${CARGO_CARGOTOML_EXTRACT_ZIP}
CARGO_CARGOLOCK=		${CARGO_CARGOLOCK_EXTRACT_ZIP}
CARGO_CARGOLOCKS=		${CARGO_CARGOLOCK_EXTRACT_ZIP} \
				${CARGO_CARGOLOCK_XOSMS}
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder rebuild build:forge

GIT_BRANCH=	HEAD
# git ls-remote --tags https://github.com/ytmdesktop/ytmdesktop 'refs/tags/${DISTVERSIONFULL}^{}'
GIT_COMMIT_HASH=eb7c5d997e0060ff70a41a2f19928a76b397d424

post-patch:
	@${REINPLACE_CMD} -e 's/%%GIT_BRANCH%%/${GIT_BRANCH}/; \
		s/%%GIT_COMMIT_HASH%%/${GIT_COMMIT_HASH}/' \
		${WRKSRC}/config/vite/renderer.ts

pre-build:
	cd ${WRKSRC}/extract-zip && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build \
		--manifest-path ${CARGO_CARGOTOML_EXTRACT_ZIP} \
		--release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/*/libextract_zip.so \
		${WRKSRC}/node_modules/@electron-internal/extract-zip/index.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC}/xosms && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build \
		--manifest-path ${CARGO_CARGOTOML_XOSMS} \
		--release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/*/libxosms.so \
		${WRKSRC}/node_modules/xosms/xosms.freebsd-${ELECTRON_ARCH}.node
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=ytmd.icns --out=icons --format=set --root=src/assets/icons
.for size in 256 512
	${MV} ${WRKSRC}/icons/ytmd_${size}.png ${WRKSRC}/icons/icon_${size}x${size}.png
.endfor
	# copy electron dist zip file to ${WRKSRC} for electron-forge
	${CP} ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}/electron-v${UPSTREAM_ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip \
		${WRKSRC}

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/out/"YouTube Music Desktop App-linux-${ELECTRON_ARCH}" && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

#
# targets for port maintainer(s)
#
cargo-crates-from-multiple-lockfiles: extract
	@for lf in ${CARGO_CARGOLOCKS}; do \
		${_CARGO_AWK} ${SCRIPTSDIR}/cargo-crates.awk $${lf}; \
	done | \
	${SED} -E 's/^CARGO_CRATES=\t+/\t\t/; s/ \\$$//' | \
	${SORT} -u | \
	${SED} -e '1s/^\t\t/CARGO_CRATES=\t/; s/$$/ \\/' | \
	${SED} -e '$$s/ \\//'

.include <bsd.port.mk>
