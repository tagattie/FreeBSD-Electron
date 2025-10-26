PORTNAME=	github-desktop
DISTVERSIONPREFIX=	release-
DISTVERSION=	3.4.13-linux1
CATEGORIES=	devel

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Focus on what matters instead of fighting with Git
WWW=		https://github.com/shiftkey/desktop

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

RUN_DEPENDS=	git:devel/git \
		git-lfs:devel/git-lfs

USES=		desktop-file-utils electron:32 localbase:ldflags \
		nodejs:20,build pkgconfig python:build

USE_GITHUB=	yes
GH_ACCOUNT=	shiftkey
GH_PROJECT=	desktop
GH_TUPLE=	github:gemoji:50865e8895c54037bf06c4c1691aa925d030a59d:gemoji/gemoji \
		github:gitignore:e89e04390435f1e7628740d7b4ce1fe65ac218fd:gitignore/app/static/common/gitignore \
		github:choosealicense.com:d4edd14487305505af3eab98e364b9d2a86c5eec:choosealicense/app/static/common/choosealicense.com

SUB_FILES=	${PORTNAME}

MAKE_ENV+=	CIRCLE_SHA1=2b2484a3d4b439b36e43c207013252e1ac859bb0
REINPLACE_FILES=	app/src/lib/editors/linux.ts \
			app/src/lib/shells/linux.ts \
			app/node_modules/dugite/build/lib/git-environment.js

USE_ELECTRON=	npm:yarn1 appbuilder prefetch extract rebuild
REBUILD_WRKSRC_ELECTRON=	${WRKSRC}/app

post-patch:
	@${REINPLACE_CMD} -e 's|%%LOCALBASE%%|${LOCALBASE}|' \
		${REINPLACE_FILES:S|^|${WRKSRC}/|}

do-build:
	@${MKDIR} ${WRKSRC}/app/node_modules/dugite/git
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run compile:script
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:prod

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 32 64 128 256 512 1024
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/app/static/linux/logos/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd "${WRKSRC}/dist/GitHub Desktop-linux-${ELECTRON_ARCH}" && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
