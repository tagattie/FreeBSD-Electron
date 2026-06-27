# Notes for port maintainer(s)
#
# Before copying package.json, pnpm-lock.yaml and pnpm-workspace.yaml to
# ${PKGJSONSDIR}, do the following steps:
# 1. Add tsx to devDependencies in ${WRKSRC}
#    $ corepack pnpm add --save-dev --ignore-scripts tsx

PORTNAME=	session-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.18.0
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Decentralized, Onion routed, private messenger
WWW=		https://getsession.org

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	${LOCALBASE}/lib/node_sqlcipher.node:security/node-sqlcipher
LIB_DEPENDS=	libinotify.so:devel/libinotify \
		libvips.so:graphics/vips

USES=		cmake:indirect electron:40 localbase:ldflags nodejs:24,build \
		npm:pnpm python:3.12+,build

USE_GITHUB=	yes
GH_ACCOUNT=	session-foundation
GH_TUPLE=	session-foundation:session-desktop-dynamic-assets:740155b3085f683fa74d46118f860ca79b166144:dynamic_assets/dynamic_assets \
		session-foundation:session-localization:ceffc446039c90ea1b85b9d6c83df9f282113045:localization/ts/localization

MAKE_ENV=	SIGNAL_ENV=production

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md README.md THEMES.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	appbuilder:devel rebuild build:builder

ELECTRON_MAKE_FLAGS+=	--config.extraMetadata.environment=production \
			--config.directories.output=release

pre-build:
	@${MKDIR} ${WRKSRC}/node_modules/@signalapp/sqlcipher/prebuilds/freebsd-${ELECTRON_ARCH}
	${CP} ${LOCALBASE}/lib/node_sqlcipher.node \
		${WRKSRC}/node_modules/@signalapp/sqlcipher/prebuilds/freebsd-${ELECTRON_ARCH}
	cd ${WRKSRC}/node_modules/libsession_util_nodejs && \
	${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} pnpm run install
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm exec patch-package
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build

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
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test

.include <bsd.port.mk>
