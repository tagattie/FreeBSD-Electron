# Notes for port maintainer
#
# Before copying package.json and package-lock.json to ${PKGJSONSDIR}, do the following steps:
# 1. Downgrade electron-builder to 25 (from 26) in ${WRKSRC}
#    (electron-builder 26 appears to have some issues with packaging node_modules)
#   $ npm install --save-dev --ignore-scripts 'electron-builder@^25'

PORTNAME=	teams
DISTVERSIONPREFIX=	v
DISTVERSION=	2.5.1
CATEGORIES=	net-im

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Unofficial Microsoft Teams client
WWW=		https://github.com/IsmaelMartinez/teams-for-linux

LICENSE=	GPLv3+
LICENSE_FILE=	${WRKSRC}/LICENSE.md

USES=		desktop-file-utils electron:37 localbase:ldflags \
		nodejs:22,build python:build

USE_GITHUB=	yes
GH_ACCOUNT=	IsmaelMartinez
GH_PROJECT=	teams-for-linux

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md HISTORY.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:npm appbuilder prefetch extract rebuild build:builder

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 32 48 64 96 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
