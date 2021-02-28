# $FreeBSD$

PORTNAME=	boostnote
DISTVERSIONPREFIX=	v
DISTVERSION=	0.13.2
CATEGORIES=	deskutils

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Intuitive and stylish markdown note app for developers

LICENSE=	GPLv3+
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	app-builder:devel/app-builder

USES=		desktop-file-utils electron:11 gnome node:12,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	BoostIO
GH_PROJECT=	BoostNote.next

INSTALLS_ICONS=	yes

SUB_FILES=	${PORTNAME}

PORTDOCS=	CONTRIBUTING.md readme.md

OPTIONS_DEFINE=	DOCS

USE_NODE=	npm
USE_ELECTRON=	prefetch extract prebuild build:builder

PREFETCH_TIMESTAMP=	1614503538
MAKE_ENV+=	BOOST_NOTE_BASE_URL=https://note.boostio.co \
		BOOST_HUB_BASE_URL=https://boosthub.io

post-extract:
	${CP} ${WRKSRC}/.env.default ${WRKSRC}/.env

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CMD} run build:electron
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPX_CMD} rimraf dist
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPX_CMD} env-cmd npm run meta
	# generate icons
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} app-builder icon \
		--input=icon.icns --out=icons --format=set --root=static

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME}${PKGNAMESUFFIX} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}${PKGNAMESUFFIX}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 48
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
.for size in 32 64 128 256 512 1024
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/icons/icon_${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	# clean up backup files
	${FIND} ${STAGEDIR}${DATADIR} -type f \( -name '*.bak' -o -name '*.orig' \) -delete

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}


.include <bsd.port.mk>
