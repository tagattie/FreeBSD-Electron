PORTNAME=	github-desktop
DISTVERSIONPREFIX=	release-
DISTVERSION=	3.4.13-linux1
CATEGORIES=	devel
DISTFILES=	${PREFETCH_FILE}:prefetch

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

USE_ELECTRON=	npm:yarn1,fetch,extract,build appbuilder rebuild
PREFETCH_FILE=	${PORTNAME}-${DISTVERSION}-node-modules${EXTRACT_SUFX}
REBUILD_WRKSRC_ELECTRON=	${WRKSRC}/app

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/node-modules-cache/.yarnrc; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		for dir in . app; do \
			cd ${WRKDIR}/node-modules-cache/$${dir} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				yarn --frozen-lockfile --ignore-scripts; \
		done; \
		${FIND} ${WRKDIR}/node-modules-cache -depth 1 -print | ${GREP} -v yarn-offline-cache | \
			${XARGS} ${RM} -r; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | \
		${AWK} ' \
			function oct2dec(octstr, i, c, val) { \
				val = 0; \
				for (i = 1; i <= length(octstr); i++) { \
					c = substr(octstr, i, 1); \
					if (c < "0" || c > "7") { \
						break; \
					} \
					val = val * 8 + (c - "0"); \
				} \
				return val; \
			} \
			{ \
				if (match($$0, /mode=[0-7]+/)) { \
					mode_str = substr($$0, RSTART+5, RLENGTH-5); \
					mode = oct2dec(mode_str); \
					exec_bits = 73; \
					special_bits = 3584; \
					special = and(mode, special_bits); \
					if (and(mode, exec_bits) != 0) { \
						newmode = or(special, 493); \
					} else { \
						newmode = or(special, 420); \
					} \
					sub(/mode=[0-7]+/, "mode=" sprintf("%04o", newmode)); \
				} \
				print; \
			}' | \
		${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > node-modules-cache.mtree; \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PREFETCH_FILE} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	@${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
.for dir in . app
.   for f in package.json yarn.lock
	@if [ -f ${WRKSRC}/${dir}/${f} ]; then \
		${MV} -f ${WRKSRC}/${dir}/${f} ${WRKSRC}/${dir}/${f}.bak; \
	fi
	@${CP} ${PKGJSONSDIR}/${dir}/${f} ${WRKSRC}/${dir}
.   endfor
	cd ${WRKSRC}/${dir} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn --frozen-lockfile --ignore-scripts --offline
.endfor

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
