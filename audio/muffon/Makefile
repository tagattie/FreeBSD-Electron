PORTNAME=	muffon
DISTVERSIONPREFIX=	v
DISTVERSION=	2.4.0
CATEGORIES=	audio

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Advanced multi-source music streaming + discovery client for desktop
WWW=		https://muffon.netlify.app/

LICENSE=	AGPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE

USES=		desktop-file-utils electron:39 gmake nodejs:22,build \
		python:build

USE_GITHUB=	yes
GH_ACCOUNT=	staniel359

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:pnpm appbuilder prefetch extract rebuild build:builder

post-extract:
	@if [ -f ${FILESDIR}/dot.env ]; then \
		${CP} ${FILESDIR}/dot.env ${WRKSRC}/.env; \
	fi

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} pnpm run build:vue
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
