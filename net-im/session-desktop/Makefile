PORTNAME=	session-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.13.1
CATEGORIES=	net-im
MASTER_SITES=	https://build-artifacts.signal.org/desktop/:sqlcipher
DISTFILES=	sqlcipher-${SQLCIPHER_VER}${EXTRACT_SUFX}:sqlcipher

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Onion routing based messenger
WWW=		https://getsession.org

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	app-builder:devel/app-builder \
		cmake:devel/cmake-core \
		${LOCALBASE}/lib/libsignal_tokenizer.a:devel/signal-fts5-extension
LIB_DEPENDS=	libinotify.so:devel/libinotify

USES=		electron:25 localbase:ldflags nodejs:18,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	oxen-io

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md THEMES.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1 prefetch extract rebuild build:builder

SQLCIPHER_VER=	4.5.5-fts5-fix--3.0.7--0.2.1-ef53ea45ed92b928ecfd33c552d8d405263e86e63dec38e1ec63e1b0193b630b
MAKE_ENV+=	SIGNAL_ENV=production
ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.environment=production \
			--config.directories.output=release

post-extract:
	${CP} ${DISTDIR}/sqlcipher-${SQLCIPHER_VER}${EXTRACT_SUFX} \
		${WRKSRC}/node_modules/@signalapp/better-sqlite3/deps/sqlcipher.tar.gz

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn build-everything

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/release/${ELECTRON_BUILDER_APP_OUT_DIR} && \
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
