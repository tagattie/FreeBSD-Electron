PORTNAME=	element-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.12.7
CATEGORIES=	net-im
MASTER_SITES=	https://github.com/${GH_ACCOUNT}/element-web/releases/download/${DISTVERSIONFULL}/:element_web \
		https://registry.npmjs.org/matrix-seshat/-/:matrix_seshat
DISTFILES=	element-${DISTVERSIONFULL}${EXTRACT_SUFX}:element_web \
		matrix-seshat-${MATRIX_SESHAT_VER}.tgz:matrix_seshat

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Glossy Matrix collaboration client for desktop
WWW=		https://element.io

LICENSE=	AGPLv3+ GPLv3+
LICENSE_COMB=	dual
LICENSE_FILE_AGPLv3+ =	${WRKSRC}/LICENSE-AGPL-3.0
LICENSE_FILE_GPLv3+ =	${WRKSRC}/LICENSE-GPL-3.0

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libsqlcipher.so:databases/sqlcipher \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:39 gmake nodejs:22,build \
		pkgconfig python:build

USE_GITHUB=	yes
GH_ACCOUNT=	element-hq

CARGO_CARGOTOML=${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no
CARGO_ENV=	OPENSSL_NO_VENDOR=1

BINARY_ALIAS=	python=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1 appbuilder:devel prefetch extract rebuild build:builder

MATRIX_SESHAT_VER=	4.0.1
RUST_ARCH=		${ARCH:S/amd64/x86_64/:S/i386/i686/}

post-extract:
	@${TAR} -xf ${DISTDIR}/matrix-seshat-${MATRIX_SESHAT_VER}.tgz --strip-components 1 \
		-C ${WRKSRC}/matrix-seshat --exclude package.json
	@${MKDIR} ${WRKSRC}/.hak/hakModules/matrix-seshat \
		${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	@cd ${WRKSRC}/matrix-seshat && \
		${COPYTREE_SHARE} . ${WRKSRC}/.hak/hakModules/matrix-seshat
	@cd ${WRKSRC}/matrix-seshat && \
		${COPYTREE_SHARE} . ${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	@${RM} ${WRKSRC}/.yarnrc
	@${MKDIR} ${WRKSRC}/deploys
	@${MV} ${WRKDIR}/element-${DISTVERSIONFULL} ${WRKSRC}/deploys
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run fetch --noverify --cfgdir "element.io/release"

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn exec patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${ELECTRON_REBUILD_ENV} yarn run build:native
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:ts
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:res
	# generate icon files
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48
	@${MV} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 1024
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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
