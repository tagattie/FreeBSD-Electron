# Notes for port maintainer
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR}, do the following steps:
# 1. Add node-addon-api and node-gyp to devDependencies in ${WRKSRC}
#    $ yarn add --dev --ignore-scripts node-addon-api node-gyp

PORTNAME=	session-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.16.6
CATEGORIES=	net-im
MASTER_SITES=	https://build-artifacts.signal.org/desktop/:sqlcipher
DISTFILES=	sqlcipher-${SQLCIPHER_VER}${EXTRACT_SUFX}:sqlcipher

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Decentralized, Onion routed, private messenger
WWW=		https://getsession.org

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	${LOCALBASE}/lib/cmake/fmt/fmt-config.cmake:devel/libfmt \
		${LOCALBASE}/lib/libsignal_sqlcipher_extension.a:devel/signal-sqlcipher-extension
LIB_DEPENDS=	libinotify.so:devel/libinotify \
		libvips.so:graphics/vips

USES=		cmake:indirect electron:34 localbase:ldflags nodejs:20,build \
		python:3.12+,build

USE_GITHUB=	yes
GH_ACCOUNT=	session-foundation

MAKE_ENV=	SIGNAL_ENV=production

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md THEMES.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1 appbuilder:devel prefetch extract rebuild build:builder

# See ${WRKSRC}/node_modules/@signalapp/better-sqlite3/deps/download.js for SQLCIPHER_VER
SQLCIPHER_VER=	v2-4.6.1-signal-patch2--0.2.1-asm2-6253f886c40e49bf892d5cdc92b2eb200b12cd8d80c48ce5b05967cfd01ee8c7
ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.environment=production \
			--config.directories.output=release

post-extract:
	@${CP} ${DISTDIR}/sqlcipher-${SQLCIPHER_VER}${EXTRACT_SUFX} \
		${WRKSRC}/node_modules/@signalapp/better-sqlite3/deps/sqlcipher.tar.gz

pre-build:
	cd ${WRKSRC}/node_modules/libsession_util_nodejs && \
		${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} yarn run install
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
