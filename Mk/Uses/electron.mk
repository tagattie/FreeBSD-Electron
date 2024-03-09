# Provides support for Electron-based ports
#
# Feature:	electron
# Usage:	USES=electron:<version>[,ARGS]
# Valid ARGS:	<version>, build, run, test
#
# <version>:	A specific major version of Electron the port is based on.
#		The port must specify exactly a single major version.
# build:	Electron is needed at build time. Adds it to BUILD_DEPENDS.
# run:		Electron is needed at run time. Adds it to RUN_DEPENDS.
# test:		Electron is needed at test time. Adds it to TEST_DEPENDS.
#
# NOTE: If the port specifies none of build, run or test, we assume the port
# requires all those dependencies.
#
# Variables, which may be set by the port:
#
# USE_ELECTRON:		A list of additional features and functionalities to
#			enable. Supported features are:
#
#	npm:		A node package manager the port uses.
#			Supported package managers are:
#
#		npm:	The port uses NPM as package manager.
#		yarn1:	The port uses Yarn (v1) as package manager.
#		yarn2:	The port uses Yarn (v2 or v3) as package manager.
#		yarn4:	The port uses Yarn (v4+) as package manager.
#		pnpm:	The port uses PNPM as package manager.
#
#		NOTE: Only a single package manager can be specified.
#
#		Other valid arguments are:
#
#		fetch, extract, build, run, and test,
#
#		each of which corresponds to respective dependency. If the port
#		does not specify any of those dependencies, we assume only
#		build time dependency is required.
#
#	prefetch:	Downloads node modules the port uses according to the
#			pre-stored package.json (and package-lock.json,
#			yarn.lock, or pnpm-lock.yaml) depending on the node
#			package manager used) in PKGJSONSDIR. Downloaded node
#			modules are archived into a single tar file as one of
#			the DISTFILES.
#
#		If the port uses this feature, the following variable must be
#		specified.
#
#	extract:	Installs the prefetched node modules into the port's
#			working source directory.
#
#	rebuild:	Rebuilds native node modules against nodejs or electron.
#			Supported arguments are:
#
#		nodejs:	Rebuilds native node modules against the version of
#			nodejs installed before pre-build phase so that nodejs
#			can execute the native modules during build.
#
#		electron: Rebuilds native node modules against the version of
#			electron the port uses before do-build phase so that
#			the native modules can be executed with Electron on run
#			time.
#
#		NOTE: If the port specifies none of those arguments, we assume
#		both nodejs and electron have been specified.
#
#		If the port uses this feature, the following variables may be
#		specified. (The build process tries to auto-detect these
#		versions so you don't usually have to specify the values.)
#
#		UPSTREAM_ELECTRON_VER:
#		UPSTREAM_CHROMEDRIVER_VER:
#		UPSTREAM_MKSNAPSHOT_VER:
#			An electron/chromedriver/mksnapshot version the port
#			depends on. Those versions are usually specified in
#			either package-lock.json, yarn.lock, or pnpm-lock.yaml
#			file in the source directory.
#
#			The build process will generate a zip archive and a
#			checksum file of electron/chromedriver/mksnapshot to
#			prevent the build phase to download binary distribution
#			files from GitHub.
#
#	build:		Prepares an electron application in a distributable
#			format using the specified package builder as an
#			argument.
#
#		If you use this feature, one of the following argument must be
#		specified. Valid arguments are:
#
#		builder:	Uses electron-builder for packaging.
#		forge:		Uses electron-forge for packageing.
#		packager:	Uses electron-packager for packaging.
#
#		If you use this feature, the following variable can be
#		specified.
#
#		ELECTRON_MAKE_FLAGS:
#			Additional flags to pass to the specified package
#			builder. The default flags are defined in this file.
#
# MAINTAINER:	tagattie@FreeBSD.org

.if !defined(_INCLUDE_USES_ELECTRON_MK)
_INCLUDE_USES_ELECTRON_MK=	yes

# Electron uses Node (actually a package manager) for build
.include "${USESDIR}/nodejs.mk"

_VALID_ELECTRON_VERSIONS=	6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
_VALID_ELECTRON_FEATURES=	npm prefetch extract rebuild build
_VALID_ELECTRON_FEATURES_NPM=	npm yarn1 yarn2 yarn4 pnpm
_VALID_ELECTRON_FEATURES_REBUILD=nodejs electron
_VALID_ELECTRON_FEATURES_BUILD=	builder forge packager

_ELECTRON_BASE_CMD=	electron
_ELECTRON_RELPORTDIR=	devel/electron
_ELECTRON_DOWNLOAD_URL_BASE=	https://github.com/electron/electron/releases/download
ELECTRON_ARCH=		${ARCH:S/aarch64/arm64/:S/amd64/x64/:S/i386/ia32/}

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
.	elif ${_NODEJS_NPM} == yarn1
_NPM_PKGNAME=	yarn${NODEJS_SUFFIX}
_NPM_PORTDIR=	www/yarn${NODEJS_SUFFIX}
.	elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm
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
.	if ${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == yarn1
${stage}_DEPENDS+=	${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.	elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm
${stage}_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.	endif
.	if ${_NODEJS_NPM} == yarn1 && ${stage} == BUILD
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
NPM_INSTALL_CMD?=	npm ci
NPM_INSTALL_FLAGS_FETCH?=--ignore-scripts --no-progress --no-audit --no-fund
.   elif ${_NODEJS_NPM} == yarn1
_NPM_LOCKFILE=		yarn.lock
_NPM_MODULE_CACHE=	yarn-offline-cache
NPM_CACHE_SETUP_CMD?=	${ECHO_CMD} 'yarn-offline-mirror "./${_NPM_MODULE_CACHE}"' >> .yarnrc
NPM_INSTALL_CMD?=	yarn install
NPM_INSTALL_FLAGS_FETCH?=--frozen-lockfile --ignore-scripts
NPM_INSTALL_FLAGS_EXTRACT?=${NPM_INSTALL_FLAGS_FETCH} --offline
.   elif ${_NODEJS_NPM} == yarn2
_NPM_LOCKFILE=		yarn.lock
_NPM_MODULE_CACHE=	yarn-offline-cache
_NPM_CMDNAME=		yarn
NPM_CACHE_SETUP_CMD?=	yarn config set cacheFolder "./${_NPM_MODULE_CACHE}"
NPM_INSTALL_CMD?=	yarn install
NPM_INSTALL_FLAGS_FETCH?=--immutable --mode=skip-build
NPM_INSTALL_FLAGS_EXTRACT?=${NPM_INSTALL_FLAGS_FETCH} --immutable-cache
.   elif ${_NODEJS_NPM} == yarn4
_NPM_LOCKFILE=		yarn.lock
_NPM_MODULE_CACHE=	yarn-offline-cache
_NPM_CMDNAME=		yarn
NPM_CACHE_SETUP_CMD?=	${SH} -c "yarn config set enableGlobalCache false; \
			yarn config set cacheFolder \"./${_NPM_MODULE_CACHE}\""
NPM_INSTALL_CMD?=	yarn install
NPM_INSTALL_FLAGS_FETCH?=--immutable --mode=skip-build
NPM_INSTALL_FLAGS_EXTRACT?=${NPM_INSTALL_FLAGS_FETCH} --immutable-cache
.   elif ${_NODEJS_NPM} == pnpm
_NPM_LOCKFILE=		pnpm-lock.yaml
_NPM_MODULE_CACHE=	node_modules
_NPM_CMDNAME=		pnpm
NPM_CACHE_SETUP_CMD?=	pnpm set extend-node-path false
NPM_INSTALL_CMD?=	pnpm install
NPM_INSTALL_FLAGS_FETCH?=--frozen-lockfile --ignore-scripts
.   endif
.endif

PKGJSONSDIR?=		${FILESDIR}/packagejsons
NPM_VER?=		0

_PREFETCH_TIMESTAMP=	61171200

.if exists(${PKGJSONSDIR}/${_NPM_PKGFILE})
_EXISTS_NPM_PKGFILE=	1
.else
_EXISTS_NPM_PKGFILE=	0
.endif

.if ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm
.   if ${_EXISTS_NPM_PKGFILE} == 1 && ${NPM_VER} == 0
NPM_VER!=	${GREP} packageManager ${PKGJSONSDIR}/${_NPM_PKGFILE} | \
		${AWK} -F ':' '{print $$NF}' | \
		${SED} -e 's/[",]//g' | \
		${AWK} -F '@' '{print $$NF}'
.   endif
.   if ${NPM_VER} == 0
IGNORE=	does not specity ${_NPM_CMDNAME} version for prefetching modules
.   endif

_USES_fetch+=	490:electron-fetch-node-package-manager

DISTFILES+=	${_NPM_CMDNAME}-${NPM_VER}.tgz:prefetch
FETCH_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}

electron-fetch-node-package-manager:
	@${ECHO_MSG} "===>   Fetching and setting up ${_NPM_CMDNAME} version ${NPM_VER}"
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR} ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_NPM_CMDNAME}-${NPM_VER}.tgz ]; then \
		cd ${WRKDIR} && \
		${SETENV} ${MAKE_ENV} corepack prepare --activate --output ${_NPM_CMDNAME}@${NPM_VER} && \
		${TAR} -xzf corepack.tgz && \
		${MTREE_CMD} -cbnSp ${_NPM_CMDNAME} | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${_PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:${_NPM_CMDNAME}:' | \
			${SED} -e '1d' > ${_NPM_CMDNAME}.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_NPM_CMDNAME}-${NPM_VER}.tgz @${_NPM_CMDNAME}.mtree; \
	else \
		${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/${_NPM_CMDNAME}-${NPM_VER}.tgz; \
	fi
.endif

.if defined(_ELECTRON_FEATURE_PREFETCH)
_DISTFILE_prefetch=	${PKGNAMEPREFIX}${PORTNAME}${PKGNAMESUFFIX}-${DISTVERSION}-node-modules${EXTRACT_SUFX}
DISTFILES+=		${_DISTFILE_prefetch}:prefetch

.   if ${_EXISTS_NPM_PKGFILE} == 0
IGNORE=	does not store ${_NPM_PKGFILE} in ${PKGJSONSDIR}
.   endif

.   if ${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == yarn1
FETCH_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   endif
_USES_fetch+=	491:electron-fetch-node-modules

electron-fetch-node-modules:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>   Setting up node modules cache directory"; \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		cd ${PKGJSONSDIR} && \
			${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/node-modules-cache; \
		cd ${WRKDIR}/node-modules-cache && ${SETENV} ${MAKE_ENV} ${NPM_CACHE_SETUP_CMD}; \
		${ECHO_MSG} "===>   Prefetching and archiving node modules"; \
		cd ${WRKDIR}/node-modules-cache && \
		${SETENV} ${MAKE_ENV} ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_FETCH}; \
		${FIND} ${WRKDIR}/node-modules-cache -depth 1 -print | \
			${GREP} -v ${_NPM_MODULE_CACHE} | ${XARGS} ${RM} -r; \
		${RM} ${WRKDIR}/node-modules-cache/${_NPM_MODULE_CACHE}/.gitignore; \
		${RM} ${WRKDIR}/node-modules-cache/${_NPM_MODULE_CACHE}/.modules.yaml; \
		${FIND} ${WRKDIR}/node-modules-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp ${_NPM_MODULE_CACHE} | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${_PREFETCH_TIMESTAMP}.000000000:' \
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
_USES_extract+=	600:electron-extract-node-package-manager \
		601:electron-copy-package-file \
		602:electron-install-node-modules

.   if ${_NODEJS_NPM} == yarn1
EXTRACT_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm
EXTRACT_DEPENDS+= ${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.   endif

electron-extract-node-package-manager:
.   if ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm
	@${ECHO_MSG} "===>   Setting up ${_NPM_CMDNAME} version ${NPM_VER}"
	@${MKDIR}  ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack enable --install-directory ${WRKDIR}/.bin
	@${SETENV} ${MAKE_ENV} corepack hydrate --activate ${DISTDIR}/${DIST_SUBDIR}/${_NPM_CMDNAME}-${NPM_VER}.tgz
.   else
	@${DO_NADA}
.   endif

electron-copy-package-file:
.if ${_EXISTS_NPM_PKGFILE} == 1
	@${ECHO_MSG} "===>   Copying ${_NPM_PKGFILE} and ${_NPM_LOCKFILE} to ${WRKSRC}"
	@for f in `${FIND} ${PKGJSONSDIR} -type f \( -name ${_NPM_PKGFILE} -o -name ${_NPM_LOCKFILE} \) -print | ${SED} -e 's|${PKGJSONSDIR}/||'`; do \
		if [ -f ${WRKSRC}/$${f} ]; then \
			${MV} -f ${WRKSRC}/$${f} ${WRKSRC}/$${f}.bak; \
		fi; \
		${CP} ${PKGJSONSDIR}/$${f} ${WRKSRC}/$${f}; \
	done
.endif

electron-install-node-modules:
.   if ${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == pnpm
	@${ECHO_MSG} "===>   Moving prefetched node modules to ${WRKSRC}"
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
.   elif ${_NODEJS_NPM} == yarn1
	@${ECHO_MSG} "===>   Installing node modules from prefetched cache"
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CACHE_SETUP_CMD}
	@cd ${WRKSRC} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_EXTRACT}
.   elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
	@${ECHO_MSG} "===>   Installing node modules from prefetched cache"
	@if [ -d ${WRKDIR}/${_NPM_MODULE_CACHE} ]; then \
		${MV} ${WRKDIR}/${_NPM_MODULE_CACHE} ${WRKSRC}; \
	fi
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_CACHE_SETUP_CMD}
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn config set enableNetwork false
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn config set enableInlineBuilds true
	@cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NPM_INSTALL_CMD} ${NPM_INSTALL_FLAGS_EXTRACT}
.   endif
.endif # _ELECTRON_FEATURE_EXTRACT

_USES_patch+=	600:electron-patch-package-json

electron-patch-package-json:
	@${ECHO_MSG} "===>   Patching package.json"
	@${REINPLACE_CMD} -e 's/electron-builder install-app-deps/& --platform linux/' ${WRKSRC}/package.json

.if defined(_ELECTRON_FEATURE_REBUILD)
_USES_build+=	290:electron-generate-electron-zip \
		291:electron-rebuild-native-node-modules-for-node \
		490:electron-rebuild-native-node-modules-for-electron

BUILD_DEPENDS+=	zip:archivers/zip
.   if defined(_NODEJS_NPM) && (${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == yarn1)
BUILD_DEPENDS+= ${_NPM_PKGNAME}>0:${_NPM_PORTDIR}
.   elif defined(_NODEJS_NPM) && (${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm)
BUILD_DEPENDS+=	${_NODEJS_PKGNAME}>0:${_NODEJS_PORTDIR}
.   endif
.   if defined(_NODEJS_NPM) && ${_NODEJS_NPM} == yarn1
BUILD_DEPENDS+=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}	# npm is needed for node-gyp
.   endif

.   if defined(_NODEJS_NPM) && ${_NODEJS_NPM} == npm
BUILD_DEPENDS+=	jq:textproc/jq
.   elif defined(_NODEJS_NPM) && (${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4 || ${_NODEJS_NPM} == pnpm)
BUILD_DEPENDS+=	yq:textproc/yq
.   endif

.   if !defined(UPSTREAM_ELECTRON_VER)
.	if ${_EXISTS_NPM_PKGFILE} == 1
.	    if ${_NODEJS_NPM} == npm
UPSTREAM_ELECTRON_VER!=	${CAT} ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
			${LOCALBASE}/bin/jq -r \
				'.packages | \
				to_entries | \
				map(if(.key | test("electron$$")) then .value.version else empty end) | \
				.[]' | \
			${HEAD} -n 1
.	    elif ${_NODEJS_NPM} == yarn1
UPSTREAM_ELECTRON_VER!=	${GREP} -e 'resolved.*/electron/' ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
			${HEAD} -n 1 | \
			${AWK} -F- '{print $$NF}' | \
			${SED} -E 's/\.[a-z]+.*$$//'
.	    elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
UPSTREAM_ELECTRON_VER!=	${CAT} ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
			${LOCALBASE}/bin/yq -r \
				'. | \
				to_entries | \
				map(if(.key | test("electron@")) then .value.version else empty end) | \
				.[]' | \
			${HEAD} -n 1
.	    elif ${_NODEJS_NPM} == pnpm
UPSTREAM_ELECTRON_VER!=	${CAT} ${PKGJSONSDIR}/${_NPM_LOCKFILE} | \
			${LOCALBASE}/bin/yq -r \
				'.packages | \
				to_entries | \
				map(if(.key | test("/electron@")) then .key else empty end) | \
				.[]' | \
			${HEAD} -n 1 | \
			${CUT} -f 2 -d '@'
.	    endif
.	endif
.   endif
ELECTRON_DOWNLOAD_URL=		${_ELECTRON_DOWNLOAD_URL_BASE}/v${UPSTREAM_ELECTRON_VER}
ELECTRON_DOWNLOAD_URL_HASH!=	${SHA256} -q -s ${ELECTRON_DOWNLOAD_URL}
ELECTRON_DOWNLOAD_CACHE_DIR=	.cache/electron/${ELECTRON_DOWNLOAD_URL_HASH}

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
		zip -q -r ${WRKDIR}/.cache/electron/electron-v${ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${ELECTRON_VER}
.   endif
.   if defined(_ELECTRON_FEATURE_BUILD) && ${_ELECTRON_FEATURE_BUILD} == forge
	@${MKDIR} ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR}/electron-v${UPSTREAM_ELECTRON_VER}-linux-${ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_ELECTRON_VER}
	@cd ${WRKDIR}/${ELECTRON_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt
.   endif
.   if defined(UPSTREAM_CHROMEDRIVER_VER) && ${UPSTREAM_CHROMEDRIVER_VER} != ""
	@${MKDIR} ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR}
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR}/chromedriver-v${UPSTREAM_CHROMEDRIVER_VER}-freebsd-${ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/${CHROMEDRIVER_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_CHROMEDRIVER_VER}
.   endif
.   if defined(UPSTREAM_MKSNAPSHOT_VER) && ${UPSTREAM_MKSNAPSHOT_VER} != ""
	@${MKDIR} ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR}
	@cd ${WRKDIR}/electron-dist && \
		zip -q -r ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR}/mksnapshot-v${UPSTREAM_MKSNAPSHOT_VER}-freebsd-${ELECTRON_ARCH}.zip .
	@cd ${WRKDIR}/${MKSNAPSHOT_DOWNLOAD_CACHE_DIR} && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_MKSNAPSHOT_VER}
.   endif

electron-rebuild-native-node-modules-for-node:
.   if defined(_ELECTRON_FEATURE_REBUILD_NODEJS) && \
       ${_ELECTRON_FEATURE_REBUILD_NODEJS} == yes
	@${ECHO_MSG} "===>   Rebuilding native node modules for nodejs"
.	if ${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == yarn1
		@cd ${REBUILD_WRKSRC_NODEJS} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
			npm rebuild --no-progress
.	elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
		@cd ${REBUILD_WRKSRC_NODEJS} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
			yarn rebuild
.	elif ${_NODEJS_NPM} == pnpm
		@cd ${REBUILD_WRKSRC_NODEJS} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} \
			pnpm rebuild
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
		#	npx electron-builder install-app-deps --platform linux
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			./node_modules/.bin/electron-builder install-app-deps --platform linux
.	    elif ${_NODEJS_NPM} == yarn1 || ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			yarn run electron-builder install-app-deps --platform linux
.	    elif ${_NODEJS_NPM} == pnpm
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			pnpm exec electron-builder install-app-deps --platform linux
.	    endif
.	else
.	    if ${_NODEJS_NPM} == npm || ${_NODEJS_NPM} == yarn1
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			npm rebuild --no-progress
.	    elif ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			yarn rebuild
.	    elif ${_NODEJS_NPM} == pnpm
		@cd ${REBUILD_WRKSRC_ELECTRON} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} \
			pnpm rebuild
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
.	elif ${_NODEJS_NPM} == yarn1 || ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
ELECTRON_MAKE_CMD?=	yarn run electron-builder
.	elif ${_NODEJS_NPM} == pnpm
ELECTRON_MAKE_CMD?=	pnpm exec electron-builder
.	endif
ELECTRON_MAKE_FLAGS+=	--linux --dir \
			--config.npmRebuild=false \
			--config.electronVersion=${ELECTRON_VER} \
			--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} ${ELECTRON_MAKE_FLAGS}
ELECTRON_BUILDER_APP_OUT_DIR=	linux-${ARCH:S/aarch64/arm64-/:S/amd64//:S/i386/ia32-/}unpacked
.   elif ${_ELECTRON_FEATURE_BUILD} == packager
.	if ${_NODEJS_NPM} == npm
ELECTRON_MAKE_CMD?=	npx electron-packager
.	elif ${_NODEJS_NPM} == yarn1 || ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
ELECTRON_MAKE_CMD?=	yarn run electron-packager
.	elif ${_NODEJS_NPM} == pnpm
ELECTRON_MAKE_CMD?=	pnpm exec electron-packager
.	endif
ELECTRON_MAKE_FLAGS+=	--platform=linux \
			--no-download \
			--electron-version=${ELECTRON_VER} \
			--electron-zip-dir=${WRKDIR}/.cache/electron \
			--prune \
			--overwrite
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} . ${ELECTRON_MAKE_FLAGS}
.   elif ${_ELECTRON_FEATURE_BUILD} == forge
.	if ${_NODEJS_NPM} == npm
ELECTRON_MAKE_CMD?=	npx electron-forge package
.	elif ${_NODEJS_NPM} == yarn1 || ${_NODEJS_NPM} == yarn2 || ${_NODEJS_NPM} == yarn4
ELECTRON_MAKE_CMD?=	yarn run electron-forge package
.	elif ${_NODEJS_NPM} == pnpm
ELECTRON_MAKE_CMD?=	pnpm exec electron-forge package
.	endif
ELECTRON_MAKE_FLAGS+=	--platform=linux
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${ELECTRON_MAKE_CMD} ${ELECTRON_MAKE_FLAGS}
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
MAKE_ENV+=	USE_SYSTEM_APP_BUILDER=true	# always use system app-builder for electron-builder
MAKE_ENV+=	npm_config_build_from_source=true
SUB_LIST+=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

.endif # _INCLUDE_USES_ELECTRON_MK
