PORTNAME=	vesktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.6.5
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Custom Discord app aiming to give you better performance
WWW=		https://github.com/Vencord/Vesktop

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

# electron-builder seems to try to use npm as package manager even if the project uses pnpm.
# So we have to add npm as build-time dependency.
BUILD_DEPENDS=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}

USES=		desktop-file-utils electron:40 gnome nodejs:24,build pkgconfig

USE_GITHUB=	yes
GH_ACCOUNT=	Vencord
GH_PROJECT=	Vesktop

USE_GNOME=	glib20

SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder prefetch extract rebuild build:builder

post-extract:
	@if [ -r ${FILESDIR}/detectable.json ]; then \
		${CP} ${FILESDIR}/detectable.json \
			${WRKSRC}/node_modules/arrpc/src/process/detectable.json; \
	fi

pre-build:
	cd ${WRKSRC}/packages/libvesktop && \
		${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} pnpm run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=build
.for size in 16 48 64
	${MV} ${WRKSRC}/icons/icon_${size}x${size}.png ${WRKSRC}/icons/icon_${size}.png
.endfor

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 48 64 128 256
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} pnpm run test

# target for port maintainer(s)
fetch-detectable-db: extract
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run postinstall
	${CP} ${WRKSRC}/node_modules/arrpc/src/process/detectable.json \
		${FILESDIR}

.include <bsd.port.mk>
