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
#	prebuild:	Rebuilds native node modules against the version of Node
#			installed before pre-build phase so that Node can
#			execute the native modules.
#			In addition the feature rebuilds native node modules
#			against the version of Electron installed before
#			do-build phase so that the native modules can be
#			executed with Electron.
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

_VALID_ELECTRON_VERSIONS=	4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
_VALID_ELECTRON_FEATURES=	npm prefetch extract prebuild build
_VALID_ELECTRON_FEATURES_NPM=	npm yarn
_VALID_ELECTRON_FEATURE_BUILDS=	builder packager

_ELECTRON_BASE_CMD=	electron
_ELECTRON_RELPORTDIR=	devel/electron

# Detect a build, run or test time dependencies on Electron
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

# If the port does not specify any dependency, assume all are required
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
.include "${PORTSDIR}/devel/electron${_ELECTRON_VERSION}/Makefile.version"
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

# Detect a fetch, extract, build, run, or test time dependencies on package manager
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
# If the port does not specify any dependency, we assume only build dep is required
.   if !defined(_ELECTRON_FEATURE_NPM_FETCH) && !defined(_ELECTRON_FEATURE_NPM_EXTRACT) && \
       !defined(_ELECTRON_FEATURE_NPM_BUILD) && !defined(_ELECTRON_FEATURE_NPM_RUN) && \
       !defined(_ELECTRON_FEATURE_NPM_TEST)
_ELECTRON_FEATURE_NPM_BUILD=	yes
.   endif
# Now _ELECTRON_FEATURE_NPM should contain a package manager name
.   if ${_VALID_ELECTRON_FEATURES_NPM:M${_ELECTRON_FEATURE_NPM:C/^[^\:]*(\:|\$)//}}
_ELECTRON_FEATURE_NPM:=	${_ELECTRON_FEATURE_NPM:C/^[^\:]*(\:|\$)//}
.   else
IGNORE=	uses unknown USE_ELECTRON features: ${_ELECTRON_FEATURE_NPM}
.   endif
_NODEJS_NPM=		${_ELECTRON_FEATURE_NPM}
_NODEJS_NPM_PKGNAME=	${_NODEJS_NPM}${NODEJS_SUFFIX}
_NODEJS_NPM_PORTDIR=	www/${_NODEJS_NPM}${NODEJS_SUFFIX}
.endif

# Detect builder used with USE_ELECTRON=builder
.if defined(_ELECTRON_FEATURE_BUILD)
.   if ${_VALID_ELECTRON_FEATURE_BUILDS:M${_ELECTRON_FEATURE_BUILD:C/^[^\:]*(\:|\$)//}}
_ELECTRON_FEATURE_BUILD:=	${_ELECTRON_FEATURE_BUILD:C/^[^\:]*(\:|\$)//}
.   else
IGNORE=	uses unknown USE_ELECTRON features: ${_ELECTRON_FEATURE_BUILD}
.   endif
.endif

# Setup dependencies
.for stage in BUILD RUN TEST
.   if defined(_ELECTRON_${stage}_DEP)
${stage}_DEPENDS+=	${_ELECTRON_BASE_CMD}${_ELECTRON_VERSION}:${_ELECTRON_PORTDIR}
.   endif
.endfor
.for stage in FETCH EXTRACT BUILD RUN TEST
.   if defined(_ELECTRON_FEATURE_NPM_${stage})
${stage}_DEPENDS+=	${_NODEJS_NPM_PKGNAME}>0:${_NODEJS_NPM_PORTDIR}
.   endif
.endfor

ELECTRON_VERSION=	${_ELECTRON_VERSION}
ELECTRON_PORTDIR=	${_ELECTRON_PORTDIR}

PKGJSONSDIR?=		${FILESDIR}/packagejsons
PREFETCH_TIMESTAMP?=	0

.if defined(_ELECTRON_FEATURE_PREFETCH)
_DISTFILE_prefetch=	${PKGNAME}-node-modules${EXTRACT_SUFX}
DISTFILES+=		${_DISTFILE_prefetch}:prefetch

.   if ${PREFETCH_TIMESTAMP} == 0
IGNORE= does not specify timestamp for pre-fetched modules
.   endif

FETCH_DEPENDS+= ${_NODEJS_NPM_PKGNAME}>0:${_NODEJS_NPM_PORTDIR}
_USES_fetch+=	490:electron-fetch-node-modules
.   if ${_NODEJS_NPM} == npm
electron-fetch-node-modules:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>  Pre-fetching and archiving node modules"; \
		${MKDIR} ${WRKDIR}/npm-cache; \
		${CP} ${PKGJSONSDIR}/package.json ${PKGJSONSDIR}/package-lock.json ${WRKDIR}/npm-cache; \
		cd ${WRKDIR}/npm-cache && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			npm ci --ignore-scripts --no-progress && \
		${RM} package.json package-lock.json; \
		${FIND} ${WRKDIR}/npm-cache -type d -exec ${CHMOD} 755 {} ';'; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp npm-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./npm-cache:' > npm-cache.mtree && \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} @npm-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi
.   elif ${_NODEJS_NPM} == yarn
electron-fetch-node-modules:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>  Pre-fetching and archiving node modules"; \
		${MKDIR} ${WRKDIR}; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/.yarnrc; \
		${CP} ${PKGJSONSDIR}/package.json ${PKGJSONSDIR}/yarn.lock ${WRKDIR}; \
		cd ${WRKDIR} && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn --frozen-lockfile --ignore-scripts && \
		${RM} package.json yarn.lock; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > yarn-offline-cache.mtree; \
		${SETENV} LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
			${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} @yarn-offline-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi
.   endif
.endif # _FEATURE_ELECTRON_PREFETCH

.if defined(_ELECTRON_FEATURE_EXTRACT)
.   if ${_NODEJS_NPM} == npm
_USES_extract+=	900:electron-install-node-modules
electron-install-node-modules:
	@${ECHO_MSG} "===>  Copying package.json and package-lock.json to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		for f in package.json package-lock.json; do \
			if [ -f ${WRKSRC}/$${dir}/$${f} ]; then \
				${MV} -f ${WRKSRC}/$${dir}/$${f} ${WRKSRC}/$${dir}/$${f}.bak; \
			fi; \
			if [ -f $${dir}/$${f} ]; then \
				${CP} -f $${dir}/$${f} ${WRKSRC}/$${dir}; \
			fi; \
		done; \
	done
	@${ECHO_MSG} "===>  Moving pre-fetched node modules to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		${MV} ${WRKDIR}/npm-cache/$${dir}/node_modules ${WRKSRC}/$${dir}; \
	done
.   elif ${_NODEJS_NPM} == yarn
EXTRACT_DEPENDS+= ${_NODEJS_NPM_PKGNAME}>0:${_NODEJS_NPM_PORTDIR}
_USES_extract+=	900:electron-install-node-modules
electron-install-node-modules:
	@${ECHO_MSG} "===>  Copying package.json and yarn.lock to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		for f in package.json yarn.lock; do \
			if [ -f ${WRKSRC}/$${dir}/$${f} ]; then \
				${MV} -f ${WRKSRC}/$${dir}/$${f} ${WRKSRC}/$${dir}/$${f}.bak; \
			fi; \
			if [ -f $${dir}/$${f} ]; then \
				${CP} -f $${dir}/$${f} ${WRKSRC}/$${dir}; \
			fi; \
		done; \
	done
	@${ECHO_MSG} "===>  Installing node modules from pre-fetched cache"
	@${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			yarn --frozen-lockfile --ignore-scripts --offline; \
	done
.   endif
.endif # _ELECTRON_FEATURE_EXTRACT

.if defined(_ELECTRON_FEATURE_PREBUILD)
BUILD_DEPENDS+=	zip:archivers/zip
ZIP_CMD?=	${LOCALBASE}/bin/zip

BUILD_DEPENDS+= ${_NODEJS_NPM_PKGNAME}>0:${_NODEJS_NPM_PORTDIR}
.   if ${_NODEJS_NPM} == yarn
BUILD_DEPENDS+=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}	# npm is needed for node-gyp
.   endif

.   if ${ELECTRON_VERSION} < 6
.	if !defined(UPSTREAM_ELECTRON_VER)
IGNORE=	does not specify the electron version used in the upstream source. Please refer to package-lock.json or yarn.lock for this value and set this appropriately.
.	endif
.   endif

.   if !defined(UPSTREAM_CHROMEDRIVER_VER)
.	if ${_NODEJS_NPM} == npm
UPSTREAM_CHROMEDRIVER_VER!=	${GREP} -e 'resolved.*electron-chromedriver' ${PKGJSONSDIR}/package-lock.json | \
				head -n 1 | awk -F- '{print $$NF}' | sed -E 's/\.[a-z]+.*$$//'
.	elif ${_NODEJS_NPM} == yarn
UPSTREAM_CHROMEDRIVER_VER!=	${GREP} -e 'resolved.*electron-chromedriver' ${PKGJSONSDIR}/yarn.lock | \
				head -n 1 | awk -F- '{print $$NF}' | sed -E 's/\.[a-z]+.*$$//'
.	endif
CHROMEDRIVER_DOWNLOAD_URL=	https://github.com/electron/electron/releases/download/v${UPSTREAM_CHROMEDRIVER_VER}
CHROMEDRIVER_DOWNLOAD_URL_HASH!=	${SHA256} -q -s ${CHROMEDRIVER_DOWNLOAD_URL}
.   endif

_USES_build+=	290:electron-generate-electron-zip \
		290:electron-generate-chromedriver-zip \
		291:electron-rebuild-native-node-modules-for-node \
		490:electron-rebuild-native-node-modules-for-electron
electron-generate-electron-zip:
.   if !defined(_ELECTRON_FEATURE_BUILD) || \
       (defined(_ELECTRON_FEATURE_BUILD) && ${_ELECTRON_FEATURE_BUILD} == builder)
.	if ${ELECTRON_VERSION} < 6
	# This is only to pacify @electron/get and the zip file generated will
	# not be used for actual packaging.
	@${ECHO_MSG} "===>  Preparing distribution files of electron"
	@${RM} -r ${WRKDIR}/electron-dist
	@${MKDIR} ${WRKDIR}/electron-dist
	@cd ${LOCALBASE}/share/electron${ELECTRON_VERSION} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	@cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
	@${MKDIR} ${WRKDIR}/.cache/electron
	@cd ${WRKDIR}/electron-dist && \
		${ZIP_CMD} -q -r ${WRKDIR}/.cache/electron/electron-v${UPSTREAM_ELECTRON_VER}-freebsd-${ARCH:S/amd64/x64/:S/i386/ia32/}.zip .
	@cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r electron-*.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_ELECTRON_VER}
.	else
	@${DO_NADA}
.	endif
.   elif defined(_ELECTRON_FEATURE_BUILD) && ${_ELECTRON_FEATURE_BUILD} == packager
	@${ECHO_MSG} "===>  Preparing distribution files of electron"
	@${RM} -r ${WRKDIR}/electron-dist
	@${MKDIR} ${WRKDIR}/electron-dist
	@cd ${LOCALBASE}/share/electron${ELECTRON_VERSION} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	@cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
	@${MKDIR} ${WRKDIR}/.cache/electron
	@cd ${WRKDIR}/electron-dist && \
		${ZIP_CMD} -q -r ${WRKDIR}/.cache/electron/electron-v${ELECTRON_VER}-linux-${ARCH:S/amd64/x64/:S/i386/ia32/}.zip .
	@cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r electron-*.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${ELECTRON_VER}
.   endif

electron-generate-chromedriver-zip:
.   if defined(UPSTREAM_CHROMEDRIVER_VER) && ${UPSTREAM_CHROMEDRIVER_VER} != ""
	@${ECHO_MSG} "===>  Preparing distribution files of chromedriver"
	@${RM} -r ${WRKDIR}/electron-dist
	@${MKDIR} ${WRKDIR}/electron-dist
	@cd ${LOCALBASE}/share/electron${ELECTRON_VERSION} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	@cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
	@${MKDIR} ${WRKDIR}/.cache/electron/${CHROMEDRIVER_DOWNLOAD_URL_HASH}
	@cd ${WRKDIR}/electron-dist && \
		${ZIP_CMD} -q -r ${WRKDIR}/.cache/electron/${CHROMEDRIVER_DOWNLOAD_URL_HASH}/chromedriver-v${UPSTREAM_CHROMEDRIVER_VER}-freebsd-${ARCH:S/amd64/x64/:S/i386/ia32/}.zip .
	@cd ${WRKDIR}/.cache/electron/${CHROMEDRIVER_DOWNLOAD_URL_HASH} && \
		${SHA256} -r chromedriver-*.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${UPSTREAM_CHROMEDRIVER_VER}
.   else
	@${DO_NADA}
.   endif

electron-rebuild-native-node-modules-for-node:
	@${ECHO_MSG} "===>  Rebuilding native node modules for node"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && ${SETENV} ${MAKE_ENV} \
		npm_config_nodedir=${LOCALBASE} \
		npm rebuild --no-progress; \
	done

electron-rebuild-native-node-modules-for-electron:
	@${ECHO_MSG} "===>  Rebuilding native node modules for electron"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && ${SETENV} ${MAKE_ENV} \
		npm_config_runtime=electron \
		npm_config_target=${ELECTRON_VER} \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		npm rebuild --no-progress; \
	done

.endif # _ELECTRON_FEATURE_PREBUILD

.if defined(_ELECTRON_FEATURE_BUILD)
.   if ${_ELECTRON_FEATURE_BUILD} == builder
.	if ${_NODEJS_NPM} == npm
_ELECTRON_MAKE_CMD=	npx electron-builder
.	elif ${_NODEJS_NPM} == yarn
_ELECTRON_MAKE_CMD=	yarn run electron-builder
.	endif
ELECTRON_MAKE_FLAGS+=	--linux --dir \
			--config.npmRebuild=false \
			--config.electronVersion=${ELECTRON_VER} \
			--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${_ELECTRON_MAKE_CMD} ${ELECTRON_MAKE_FLAGS}
.   elif ${_ELECTRON_FEATURE_BUILD} == packager
.	if ${_NODEJS_NPM} == npm
_ELECTRON_MAKE_CMD=	npx electron-packager
.	elif ${_NODEJS_NPM} == yarn
_ELECTRON_MAKE_CMD=	yarn run electron-packager
.	endif
ELECTRON_MAKE_FLAGS+=	--platform=linux \
			--no-download \
			--electron-version=${ELECTRON_VER} \
			--electron-zip-dir=${WRKDIR}/.cache/electron \
			--prune \
			--overwrite
DO_MAKE_BUILD=	${SETENV} ${MAKE_ENV} ${_ELECTRON_MAKE_CMD} . ${ELECTRON_MAKE_FLAGS}
.   endif
ALL_TARGET=	# empty
.endif

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
