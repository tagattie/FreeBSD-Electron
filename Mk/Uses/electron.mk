# Provides support for Electron-based ports
#
# Feature:	electron
# Usage:	USES=electron[:ARGS]
# Valid ARGS:	<version>, build, run, test
#
# <version>:	Indicates a specific major version of Electron the port uses.
#
# build:	Indicates Electron is needed at build time and adds it to
#		BUILD_DEPENDS.
# run:		Indicates Electron is needed at run time and adds it to
#		RUN_DEPENDS.
# test:		Indicates Electron is needed at test time and adds it to
#		TEST_DEPENDS.
#
# NOTE: If the port specifies none of build, run or test, we assume the port
# requires all those dependencies.
#
# Variables, which can be set by the port:
#
# USE_ELECTRON:		A list of additional features and functionalities to
#			enable. Supported features are:
#
#	npm:		Indicates a node package manager the port uses.
#			Supported package managers are:
#
#		npm:	The port uses NPM as package manager.
#
#		yarn:	The port uses Yarn as package manager.
#
#		NOTE: A port must specify exactly a single package manager.
#
#		Other valid arguments are:
#
#		fetch, extract, build, run, and test,
#
#		each of which corresponds to respective dependency. If the port
#		does not specify any of those dependencies, we assume only build
#		time dependency is required.
#
#	prefetch:	Downloads node modules the port uses according to the
#			pre-stored package.json (and package-lock.json or
#			yarn.lock depending on the node package manager used) in
#			PKGJSONSDIR. Downloaded node modules are archived into a
#			single tar file as one of the DISTFILES.
#
#		If the port uses this feature, the following variable must be
#		specified.
#
#		PREFETCH_TIMESTAMP:
#			A timestamp given to every directory, file or link in
#			the tar archive. This is necessary for reproducibility
#			of the archive file. You can use "date '+%s'" command to
#			acquire this value.
#
#	extract:	Installs the pre-fetched node modules into the port's
#			working source directory.
#
#	rebuild:	Rebuilds native node modules against nodejs or electron.
#			Supported arguments are:
#
#		nodejs:	Rebuilds native node modules against the version of
#			NodeJS installed before pre-build phase so that NodeJS
#			can execute the native modules.
#
#		electron: Rebuilds native node modules against the version of
#			Electron ionstalled before do-build phase so that the
#			native modules can be executed with Electron.
#
#		NOTE: If the port specify none of those argument, we assume both
#		nodejs and electron has been specified.
#
#		If the port uses this feature and the major version of Electron
#		is less than 6, the following variable must be specified.
#
#		UPSTREAM_ELECTRON_VER:
#			An electron version which is usually specified in
#			package-lock.json or yarn.lock in the source directory.
#			The build process will generate a zip archive and a
#			checksum file from locally installed Electron to prevent
#			@electron/get from attempting to download binary
#			distribution file of Electron from GitHub during build
#			phase.
#
#		If the port uses this feature and the port depends on
#		chromedriver, the following variable must be specified.
#
#		UPSTREAM_CHROMEDRIVER_VER:
#			A chromedriver version which is usually specified in
#			package-lock.json or yarn.lock in the source directory.
#			The build process will generate a zip archive and a
#			checksum file from locally installed Electron to prevent
#			@electron/get from attempting to download binary
#			distribution file of chromedriver from GitHub during build
#			phase.
#
#		NOTE: The generated zip and checksum files are just for
#		preventing download and will not be used for other purposes.
#		This is ugly but seems necessary.
#
#	build:		Prepares an Electron application in a distributable
#			format using the specified node module as an argument.
#
#		If you use this feature, one of the following argument must be
#		specified. Valid arguments are:
#
#		builder:	Uses electron-builder for packaging.
#
#		packager:	Uses electron-packager for packaging.
#
#		If you use this feature, the following variable can be
#		specified.
#
#		ELECTRON_MAKE_FLAGS:
#			Additional flags to pass to the specified packaging
#			module. The default flags are defined in this file.
#
# MAINTAINER:	tagattie@FreeBSD.org

.if !defined(_INCLUDE_USES_ELECTRON_MK)
_INCLUDE_USES_ELECTRON_MK=	yes

# Electron uses Node (actually a package manager) for build
.include "${USESDIR}/nodejs.mk"

_VALID_ELECTRON_VERSIONS=	6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
_VALID_ELECTRON_FEATURES=	npm prefetch extract rebuild build
_VALID_ELECTRON_FEATURES_NPM=	npm yarn berry
_VALID_ELECTRON_FEATURES_REBUILD=nodejs electron
_VALID_ELECTRON_FEATURES_BUILD=	builder packager

_ELECTRON_BASE_CMD=	electron
_ELECTRON_RELPORTDIR=	devel/electron
_ELECTRON_DOWNLOAD_URL_BASE=	https://github.com/electron/electron/releases/download
_ELECTRON_ARCH=		${ARCH:S/aarch64/arm64/:S/amd64/x64/:S/i386/ia32/}

# Process USES=electron[:ARGS]
# Detect build, run or test dependency
_ELECTRON_ARGS=		${electron_ARGS:S/,/ /g}
.if ${_ELECTRON_ARGS:Mbuild}
_ELECTRON_BUILD_DEP=	yes
_ELECTRON_ARGS:=	${_ELECTRON_ARGS:Nbuild}
.endif
.if ${_ELECTRON_ARGS:Mrun}
_ELECTRON_RUN_DEP=	yes
_ELECTRON_ARGS:=	${_ELECTRON_ARGS:Nrun}
.endif
.if ${_ELECTRON_ARGS:Mtest}
_ELECTRON_TEST_DEP=	yes
_ELECTRON_ARGS:=	${_ELECTRON_ARGS:Ntest}
.endif
# If no dependencies specified, assume all are required
.if !defined(_ELECTRON_BUILD_DEP) && !defined(_ELECTRON_RUN_DEP) && \
    !defined(_ELECTRON_TEST_DEP)
_ELECTRON_BUILD_DEP=	yes
_ELECTRON_RUN_DEP=	yes
_ELECTRON_TEST_DEP=	yes
.endif
# Now _ELECTRON_ARGS should contain a single major version
.if ${_VALID_ELECTRON_VERSIONS:M${_ELECTRON_ARGS}}
_ELECTRON_VERSION=	${_ELECTRON_ARGS}
_ELECTRON_PORTDIR=	${_ELECTRON_RELPORTDIR}${_ELECTRON_VERSION}
.include "${PORTSDIR}/${_ELECTRON_PORTDIR}/Makefile.version"
.else
IGNORE= uses unknown USES=electron arguments: ${_ELECTRON_ARGS}
.endif

# Detect features used with USE_ELECTRON
.for var in ${USE_ELECTRON}
.   if empty(_VALID_ELECTRON_FEATURES:M${var:C/\:.*//})
_INVALID_ELECTRON_FEATURES+=	${var}
.   endif
.endfor
.if !empty(_INVALID_ELECTRON_FEATURES)
IGNORE=	uses unknown USE_ELECTRON features: ${_INVALID_ELECTRON_FEATURES}
.endif
# Make each individual feature available as _ELECTRON_FEATURE_<FEATURENAME>
.for var in ${USE_ELECTRON}
_ELECTRON_FEATURE_${var:C/\:.*//:tu}=	${var}
.endfor

# Process USE_ELECTRON=npm[:ARGS]
# Detect fetch, extract, build, run, or test dependency
.if defined(_ELECTRON_FEATURE_NPM)
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:S/,/ /g}
.   if ${_ELECTRON_FEATURE_NPM:Mfetch}
_ELECTRON_FEATURE_NPM_FETCH=	yes
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:Nfetch}
.   endif
.   if ${_ELECTRON_FEATURE_NPM:Mextract}
_ELECTRON_FEATURE_NPM_EXTRACT=	yes
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:Nextract}
.   endif
.   if ${_ELECTRON_FEATURE_NPM:Mbuild}
_ELECTRON_FEATURE_NPM_BUILD=	yes
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:Nbuild}
.   endif
.   if ${_ELECTRON_FEATURE_NPM:Mrun}
_ELECTRON_FEATURE_NPM_RUN=	yes
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:Nrun}
.   endif
.   if ${_ELECTRON_FEATURE_NPM:Mtest}
_ELECTRON_FEATURE_NPM_TEST=	yes
_ELECTRON_FEATURE_NPM:=		${_ELECTRON_FEATURE_NPM:Ntest}
.   endif
# If no dependencies specified, we assume only build dep is required
.   if !defined(_ELECTRON_FEATURE_NPM_FETCH) && !defined(_ELECTRON_FEATURE_NPM_EXTRACT) && \
       !defined(_ELECTRON_FEATURE_NPM_BUILD) && !defined(_ELECTRON_FEATURE_NPM_RUN) && \
       !defined(_ELECTRON_FEATURE_NPM_TEST)
_ELECTRON_FEATURE_NPM_BUILD=	yes
.   endif
# Now _ELECTRON_FEATURE_NPM should contain a single package manager
.   if ${_VALID_ELECTRON_FEATURES_NPM:M${_ELECTRON_FEATURE_NPM:C/^[^\:]*(\:|\$)//}}
_NODEJS_NPM=		${_ELECTRON_FEATURE_NPM:C/^[^\:]*(\:|\$)//}
.	if ${_NODEJS_NPM} == npm
_NPM_PKGNAME=	${_NODEJS_NPM}${NODEJS_SUFFIX}
_NPM_PORTDIR=	www/${_NODEJS_NPM}${NODEJS_SUFFIX}
.	elif ${_NODEJS_NPM} == yarn
_NPM_PKGNAME=	${_NODEJS_NPM}${NODEJS_SUFFIX}
_NPM_PORTDIR=	www/${_NODEJS_NPM}${NODEJS_SUFFIX}
.	elif ${_NODEJS_NPM} == berry
_NPM_PKGNAME=	# empty
_NPM_PORTDIR=	# empty
.	endif
_NODEJS_PKGNAME=	node${NODEJS_VERSION}
_NODEJS_PORTDIR=	www/node${NODEJS_VERSION}
.   else
IGNORE=	uses unknown USE_ELECTRON features: ${_ELECTRON_FEATURE_NPM}
.   endif
.endif

# Detect nodejs or electron argument of rebuild feature
.if defined(_ELECTRON_FEATURE_REBUILD)
_ELECTRON_FEATURE_REBUILD:=	${_ELECTRON_FEATURE_REBUILD:C/^[^\:]*(\:|\$)//:S/,/ /g}
.   if ${_ELECTRON_FEATURE_REBUILD:Mnodejs}
_ELECTRON_FEATURE_REBUILD_NODEJS=	yes
_ELECTRON_FEATURE_REBUILD:=	${_ELECTRON_FEATURE_REBUILD:Nnodejs}
.   endif
.   if ${_ELECTRON_FEATURE_REBUILD:Melectron}
_ELECTRON_FEATURE_REBUILD_ELECTRON=	yes
_ELECTRON_FEATURE_REBUILD:=	${_ELECTRON_FEATURE_REBUILD:Nelectron}
.   endif
# If no arguments specified, we assume both nodejs and electron are required
.   if !defined(_ELECTRON_FEATURE_REBUILD_NODEJS) && \
       !defined(_ELECTRON_FEATURE_REBUILD_ELECTRON)
_ELECTRON_FEATURE_REBUILD_NODEJS=	yes
_ELECTRON_FEATURE_REBUILD_ELECTRON=	yes
.   endif
.   if !empty(_ELECTRON_FEATURE_REBUILD)
IGNORE=	uses unknown USE_ELECTRON features: ${_ELECTRON_FEATURE_REBUILD}
.   endif
.endif

# Detect builder used with USE_ELECTRON=builder
.if defined(_ELECTRON_FEATURE_BUILD)
.   if ${_VALID_ELECTRON_FEATURES_BUILD:M${_ELECTRON_FEATURE_BUILD:C/^[^\:]*(\:|\$)//}}
_ELECTRON_FEATURE_BUILD:=	${_ELECTRON_FEATURE_BUILD:C/^[^\:]*(\:|\$)//}
.   else
IGNORE=	uses unknown USE_ELECTRON features: ${_ELECTRON_FEATURE_BUILD}
.   endif
.endif

# Setup dependencies
.for stage in BUILD RUN TEST
.   if defined(_ELECTRON_${stage}_DEP)
${stage}_DEPENDS+=	${_ELECTRON_BASE_CMD}${ELECTRON_VER_MAJOR}:${_ELECTRON_PORTDIR}
.   endif
.endfor
.for stage in FETCH EXTRACT BUILD RUN TEST
.   if defined(_ELECTRON_FEATURE_NPM_${stage})
.	if ${_NODEJS_NPM} != berry
${stage}_DEPENDS+=	${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.	elif ${_NODEJS_NPM} == berry
${stage}_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.	endif
.	if ${_NODEJS_NPM} == yarn && ${stage} == BUILD
${stage}_DEPENDS+=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}	# npm is needed for node-gyp
.	endif
.   endif
.endfor

.if empty(_NODEJS_NPM)
IGNORE=	does not specify a node package manager
.else
_NPM_PKGFILE=		package.json
.   if ${_NODEJS_NPM} == npm
_NPM_LOCKFILE=		package-lock.json
_NPM_MODULE_CACHE=	node_modules
NPM_CACHE_SETUP_CMD?=	${DO_NADA}
NPM_INSTALL_CMD?=	npm ci --ignore-scripts --no-progress
.   elif ${_NODEJS_NPM} == yarn
_NPM_LOCKFILE=		yarn.lock
_NPM_MODULE_CACHE=	yarn-offline-cache
NPM_CACHE_SETUP_CMD?=	${ECHO_CMD} 'yarn-offline-mirror "./${_NPM_MODULE_CACHE}"' >> .yarnrc
NPM_INSTALL_CMD?=	yarn install
NPM_INSTALL_FLAGS_FETCH?=--frozen-lockfile --ignore-scripts
NPM_INSTALL_FLAGS_EXTRACT?=${NPM_INSTALL_FLAGS_FETCH} --offline
.   elif ${_NODEJS_NPM} == berry
_NPM_LOCKFILE=		yarn.lock
_NPM_MODULE_CACHE=	yarn-offline-cache
NPM_CACHE_SETUP_CMD?=	yarn config set cacheFolder "./${_NPM_MODULE_CACHE}"
NPM_INSTALL_CMD?=	yarn install
NPM_INSTALL_FLAGS_FETCH?=--immutable --mode=skip-build
NPM_INSTALL_FLAGS_EXTRACT?=${NPM_INSTALL_FLAGS_FETCH} --immutable-cache
.   endif
.endif

PKGJSONSDIR?=		${FILESDIR}/packagejsons
PREFETCH_TIMESTAMP?=	0
YARN_VER?=		0

.if exists(${PKGJSONSDIR}/${_NPM_PKGFILE})
_EXISTS_NPM_PKGFILE=	1
.else
_EXISTS_NPM_PKGFILE=	0
.endif

.if ${_NODEJS_NPM} == berry
.   if ${YARN_VER} == 0
IGNORE=	does not specity yarn version for prefetching modules
.   endif

_USES_fetch+=	490:electron-fetch-yarn-berry

DISTFILES+=	yarn-${YARN_VER}.tgz:prefetch
FETCH_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}

electron-fetch-yarn-berry:
	@${ECHO_MSG} "===>   Fetching and setting up yarn berry version ${YARN_VER}"
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR} ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz ]; then \
		cd ${WRKDIR} && \
		${SETENV} ${MAKE_ENV} corepack prepare --activate --output yarn@${YARN_VER} && \
		${TAR} -xzf corepack.tgz && \
		${MTREE_CMD} -cbnSp yarn | ${MTREE_CMD} -C | ${TAIL} -n 2 | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:yarn:' > yarn.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz @yarn.mtree; \
	else \
		${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz; \
	fi
.endif

.if defined(_ELECTRON_FEATURE_PREFETCH)
_DISTFILE_prefetch=	${PKGNAME}-node-modules${EXTRACT_SUFX}
DISTFILES+=		${_DISTFILE_prefetch}:prefetch

.   if ${_EXISTS_NPM_PKGFILE} == 0
IGNORE=	does not store ${_NPM_PKGFILE} in ${PKGJSONSDIR}
.   endif
.   if ${PREFETCH_TIMESTAMP} == 0
IGNORE= does not specify timestamp for prefetched modules
.   endif

.   if ${_NODEJS_NPM} != berry
FETCH_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   endif
_USES_fetch+=	491:electron-fetch-node-modules

electron-fetch-node-modules:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>   Setting up node modules cache directory"; \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		cd ${WRKDIR}/node-modules-cache && ${NPM_CACHE_SETUP_CMD}; \
		${ECHO_MSG} "===>   Prefetching and archiving node modules"; \
		cd ${WRKDIR}/node-modules-cache && \
		${SETENV} ${MAKE_ENV} ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_FETCH}; \
		${FIND} ${WRKDIR}/node-modules-cache -depth 1 -print | \
			${GREP} -v ${_NPM_MODULE_CACHE} | ${XARGS} ${RM} -r; \
		${FIND} ${WRKDIR}/node-modules-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp ${_NPM_MODULE_CACHE} | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./${_NPM_MODULE_CACHE}:' > node-modules-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} @node-modules-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi
.endif # _FEATURE_ELECTRON_PREFETCH

.if defined(_ELECTRON_FEATURE_EXTRACT)
_USES_extract+=	900:electron-extract-yarn-berry \
		901:electron-copy-package-file \
		902:electron-install-node-modules

.   if ${_NODEJS_NPM} == yarn
EXTRACT_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   elif ${_NODEJS_NPM} == berry
EXTRACT_DEPENDS+= ${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.   endif

electron-extract-yarn-berry:
.   if ${_NODEJS_NPM} == berry
	@${ECHO_MSG} "===>   Setting up yarn berry version ${YARN_VER}"
	@${MKDIR}  ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/yarn-${YARN_VER}.tgz
.   else
	@${DO_NADA}
.   endif

electron-copy-package-file:
.if ${_EXISTS_NPM_PKGFILE} == 1
	@${ECHO_MSG} "===>   Copying ${_NPM_PKGFILE} and ${_NPM_LOCKFILE} to ${WRKSRC}"
.   for f in ${_NPM_PKGFILE} ${_NPM_LOCKFILE}
	@if [ -f ${WRKSRC}/${f} ]; then \
		${MV} -f ${WRKSRC}/${f} ${WRKSRC}/${f}.bak; \
	fi
	@${CP} ${PKGJSONSDIR}/${f} ${WRKSRC}
.   endfor
.endif

electron-install-node-modules:
.   if ${_NODEJS_NPM} == npm
	@${ECHO_MSG} "===>   Moving prefetched node modules to ${WRKSRC}"
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
.   elif ${_NODEJS_NPM} == yarn
	@${ECHO_MSG} "===>   Installing node modules from prefetched cache"
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CACHE_SETUP_CMD}
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
	@cd ${WRKSRC} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_EXTRACT}
.   elif ${_NODEJS_NPM} == berry
	@${ECHO_MSG} "===>   Installing node modules from prefetched cache"
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CACHE_SETUP_CMD}
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn config set enableNetwork false
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn config set enableInlineBuilds true
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_EXTRACT}
.   endif
.endif # _ELECTRON_FEATURE_EXTRACT

_USES_patch+=	900:electron-patch-package-json

electron-patch-package-json:
	@${ECHO_MSG} "===>   Patching package.json"
	@${REINPLACE_CMD} -e 's/electron-builder install-app-deps/& --platform linux/' ${WRKSRC}/package.json

.if defined(_ELECTRON_FEATURE_REBUILD)
_USES_build+=	290:electron-generate-electron-zip \
		291:electron-rebuild-native-node-modules-for-node \
		490:electron-rebuild-native-node-modules-for-electron

BUILD_DEPENDS+=	zip:archivers/zip
.   if defined(_NODEJS_NPM) && ${_NODEJS_NPM} != berry
BUILD_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   elif defined(_NODEJS_NPM) && ${_NODEJS_NPM} == berry
BUILD_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.   endif
.   if defined(_NODEJS_NPM) && ${_NODEJS_NPM} == yarn
BUILD_DEPENDS+=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}	# npm is needed for node-gyp
.   endif

.   if !defined(UPSTREAM_CHROMEDRIVER_VER)
.	if ${_EXISTS_NPM_PKGFILE} == 1
UPSTREAM_CHROMEDRIVER_VER!=	${GREP} -e 'resolved.*/electron-chromedriver/' ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
				${HEAD} -n 1 | ${AWK} -F- '{print $$NF}' | ${SED} -E 's/\.[a-z]+.*$$//'
.	endif
.   endif
CHROMEDRIVER_DOWNLOAD_URL=	${_ELECTRON_DOWNLOAD_URL_BASE}/v${UPSTREAM_CHROMEDRIVER_VER}
CHROMEDRIVER_DOWNLOAD_URL_HASH!=${SHA256} -q -s ${CHROMEDRIVER_DOWNLOAD_URL}
CHROMEDRIVER_DOWNLOAD_CACHE_DIR=.cache/electron/${CHROMEDRIVER_DOWNLOAD_URL_HASH}

.   if !defined(UPSTREAM_MKSNAPSHOT_VER)
.	if ${_EXISTS_NPM_PKGFILE} == 1
UPSTREAM_MKSNAPSHOT_VER!=	${GREP} -e 'resolved.*/electron-mksnapshot/' ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
				${HEAD} -n 1 | ${AWK} -F- '{print $$NF}' | ${SED} -E 's/\.[a-z]+.*$$//'
.	endif
.   endif
MKSNAPSHOT_DOWNLOAD_URL=	${_ELECTRON_DOWNLOAD_URL_BASE}/v${UPSTREAM_MKSNAPSHOT_VER}
MKSNAPSHOT_DOWNLOAD_URL_HASH!=	${SHA256} -q -s ${MKSNAPSHOT_DOWNLOAD_URL}
MKSNAPSHOT_DOWNLOAD_CACHE_DIR=	.cache/electron/${MKSNAPSHOT_DOWNLOAD_URL_HASH}

REBUILD_WRKSRC_NODEJS?=		${WRKSRC}
REBUILD_WRKSRC_ELECTRON?=	${WRKSRC}

electron-generate-electron-zip:
	@${ECHO_MSG} "===>   Preparing distribution files of electron/chromedriver/mksnapshot"
	@${RM} -r ${WRKDIR}/electron-dist
	@${MKDIR} ${WRKDIR}/electron-dist
	@cd ${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	@cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
.   if defined(_ELECTRON_FEATURE_BUILD) && ${_ELECTRON_FEATURE_BUILD} == packager
	@${MKDIR} ${WRKDIR}/.cache/electron
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/.cache/electron/electron-v${ELECTRON_VER}-linux-${_ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${ELECTRON_VER}
.   endif
.   if defined(UPSTREAM_CHROMEDRIVER_VER) && ${UPSTREAM_CHROMEDRIVER_VER} != ""
	@${MKDIR} ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR}
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR}/chromedriver-v${UPSTREAM_CHROMEDRIVER_VER}-freebsd-${_ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_CHROMEDRIVER_VER}
.   endif
.   if defined(UPSTREAM_MKSNAPSHOT_VER) && ${UPSTREAM_MKSNAPSHOT_VER} != ""
	@${MKDIR} ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR}
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR}/mksnapshot-v${UPSTREAM_MKSNAPSHOT_VER}-freebsd-${_ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_MKSNAPSHOT_VER}
.   endif

electron-rebuild-native-node-modules-for-node:
.   if defined(_ELECTRON_FEATURE_REBUILD_NODEJS) && \
       ${_ELECTRON_FEATURE_REBUILD_NODEJS} == yes
	@${ECHO_MSG} "===>   Rebuilding native node modules for nodejs"
.	if ${_NODEJS_NPM} != berry
		@cd ${REBUILD_WRKSRC_NODEJS} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
			npm rebuild --no-progress
.	elif ${_NODEJS_NPM} == berry
		@cd ${REBUILD_WRKSRC_NODEJS} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
			yarn rebuild
.	endif
.   else
	@${DO_NADA}
.   endif

electron-rebuild-native-node-modules-for-electron:
.   if defined(_ELECTRON_FEATURE_REBUILD_ELECTRON) && \
       ${_ELECTRON_FEATURE_REBUILD_ELECTRON} == yes
	@${ECHO_MSG} "===>   Rebuilding native node modules for electron"
.	if ${_ELECTRON_FEATURE_BUILD} == builder
.	    if ${_NODEJS_NPM} == npm
		# @cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		# 	npx electron-builder install-app-deps --platform linux
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			./node_modules/.bin/electron-builder install-app-deps --platform linux
.	    elif ${_NODEJS_NPM} == yarn || ${_NODEJS_NPM} == berry
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			yarn run electron-builder install-app-deps --platform linux
.	    endif
.	else
.	    if ${_NODEJS_NPM} != berry
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			npm rebuild --no-progress
.	    elif ${_NODEJS_NPM} == berry
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			yarn rebuild
.	    endif
.	endif
.   else
	@${DO_NADA}
.   endif
.endif # _ELECTRON_FEATURE_REBUILD

.if defined(_ELECTRON_FEATURE_BUILD)
.   if ${_ELECTRON_FEATURE_BUILD} == builder
.	if ${_NODEJS_NPM} == npm
ELECTRON_MAKE_CMD?=	npx electron-builder
.	elif ${_NODEJS_NPM} == yarn || ${_NODEJS_NPM} == berry
ELECTRON_MAKE_CMD?=	yarn run electron-builder
.	endif
ELECTRON_MAKE_FLAGS+=	--linux --dir \
			--config.npmRebuild=false \
			--config.electronVersion=${ELECTRON_VER} \
			--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} ${ELECTRON_MAKE_FLAGS}
.   elif ${_ELECTRON_FEATURE_BUILD} == packager
.	if ${_NODEJS_NPM} == npm
ELECTRON_MAKE_CMD?=	npx electron-packager
.	elif ${_NODEJS_NPM} == yarn || ${_NODEJS_NPM} == berry
ELECTRON_MAKE_CMD?=	yarn run electron-packager
.	endif
ELECTRON_MAKE_FLAGS+=	--platform=linux \
			--no-download \
			--electron-version=${ELECTRON_VER} \
			--electron-zip-dir=${WRKDIR}/.cache/electron \
			--prune \
			--overwrite
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} . ${ELECTRON_MAKE_FLAGS}
.   endif
ALL_TARGET=	# empty
.endif

NODEJS_REBUILD_ENV+=	npm_config_nodedir=${LOCALBASE}
ELECTRON_REBUILD_ENV+=	npm_config_runtime=electron
ELECTRON_REBUILD_ENV+=	npm_config_target=${ELECTRON_VER}
ELECTRON_REBUILD_ENV+=	npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers

MAKE_ENV+=	ELECTRON_OVERRIDE_DIST_PATH=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}
MAKE_ENV+=	ELECTRON_SKIP_BINARY_DOWNLOAD=1 # effective electron >=6
MAKE_ENV+=	PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1	# don't download browser for playwright
MAKE_ENV+=	PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1	# don't download chromium for puppeteer
MAKE_ENV+=	SASS_FORCE_BUILD=true		# always rebuild native node-sass module
MAKE_ENV+=	USE_SYSTEM_7ZA=true		# always use system 7za
MAKE_ENV+=	USE_SYSTEM_APP_BUILDER=true	# always use system app-builder for electron-builder
MAKE_ENV+=	XDG_CACHE_HOME=${WRKDIR}/.cache
MAKE_ENV+=	npm_config_build_from_source=true
MAKE_ENV+=	npm_config_python=${PYTHON_CMD}
SUB_LIST+=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

.endif # _INCLUDE_USES_ELECTRON_MK
