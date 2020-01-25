# $FreeBSD$
#
# bsd.electron.mk --- Helper for ports based on Electron
#
# MAINTAINER: tagattie@yandex.com

ZIP_CMD?=	${LOCALBASE}/bin/zip
NODE_CMD?=	${LOCALBASE}/bin/node
NPM_CMD?=	${LOCALBASE}/bin/npm
NPX_CMD?=	${LOCALBASE}/bin/npx
YARN_CMD?=	${LOCALBASE}/bin/yarn

_VALID_NODE_VERSIONS=	8 10 12 yes
_VALID_NODE_PKG_MANAGERS=	npm yarn
_VALID_ELECTRON_VERSIONS=	4 5 6 7
_VALID_ELECTRON_USAGES=	build run
_VALID_ELECTRON_HELPERS=	fetch extract build

.if defined(USE_NODE)
_NODE_VERSION_ARG=	${USE_NODE:C/\:.*//}
.for var in ${_VALID_NODE_VERSIONS}
.   if ${_NODE_VERSION_ARG:M${var}}
_NODE_VERSION=	${var}
.   endif
.endfor
.if empty(_NODE_VERSION)
IGNORE=	specifies invalid node version: ${_NODE_VERSION_ARG}
.endif

_NODE_PKG_MANAGER_ARG=	${USE_NODE:C/^[^\:]*(\:|\$)//}
.for var in ${_VALID_NODE_PKG_MANAGERS}
.   if ${_NODE_PKG_MANAGER_ARG:M${var}}
_NODE_PKG_MANAGER=	${var}
.   endif
.endfor
.if empty(_NODE_PKG_MANAGER)
IGNORE=	specifies invalid node package manager: ${_NODE_PKG_MANAGER_ARG}
.endif

PREFETCH_METHOD?=	${_NODE_PKG_MANAGER}
.endif # USE_NODE

.if defined(USE_ELECTRON)
_ELECTRON_VERSION_ARG=	${USE_ELECTRON:C/\:.*//}
.for var in ${_VALID_ELECTRON_VERSIONS}
.   if ${_ELECTRON_VERSION_ARG:M${var}}
_ELECTRON_VERSION=	${var}
.   endif
.endfor
.if empty(_ELECTRON_VERSION)
IGNORE=	specifies invalid electron version: ${_ELECTRON_VERSION_ARG}
.endif

_ELECTRON_USAGES_ARG=	${USE_ELECTRON:C/^[^\:]*(\:|\$)//:S/,/ /g}
.for var in ${_ELECTRON_USAGES_ARG}
.   if ${_VALID_ELECTRON_USAGES:M${var}}
_ELECTRON_USAGES+=	${var}
.   else
_INVALID_ELECTRON_USAGES+=	${var}
.   endif
.endfor
.if !empty(_INVALID_ELECTRON_USAGES)
IGNORE=	specifies invalid electron usage: ${_INVALID_ELECTRON_USAGES}
.endif
.if empty(_ELECTRON_USAGES)
_ELECTRON_USAGES=	build run
.endif
.endif # USE_ELECTRON

.if defined(USE_ELECTRON_HELPER)
_ELECTRON_HELPERS_ARG=	${USE_ELECTRON_HELPER}
.for var in ${_ELECTRON_HELPERS_ARG}
.   if ${_VALID_ELECTRON_HELPERS:M${var}}
_ELECTRON_HELPERS+=	${var}
.   else
_INVALID_ELECTRON_HELPERS+=	${var}
.   endif
.endfor
.if !empty(_INVALID_ELECTRON_HELPERS)
IGNORE=	specifies invalid electron helper: ${_INVALID_ELECTRON_HELPERS}
.endif
.if empty(_ELECTRON_HELPERS)
IGNORE=	does not specify any valid electron helper
.endif
.endif # USE_ELECTRON_HELPERS

.if defined(_NODE_VERSION)
.   if ${_NODE_VERSION} == yes
BUILD_DEPENDS+=	node:www/node
.   else
BUILD_DEPENDS+= node:www/node${_NODE_VERSION}
.   endif
.endif # _NODE_VERSION

.if defined(_ELECTRON_VERSION)
.   if ${_ELECTRON_USAGES:Mbuild}
BUILD_DEPENDS+=	electron${_ELECTRON_VERSION}:devel/electron${_ELECTRON_VERSION}
.   endif
.   if ${_ELECTRON_USAGES:Mrun}
RUN_DEPENDS+=	electron${_ELECTRON_VERSION}:devel/electron${_ELECTRON_VERSION}
.   endif
.endif # _ELECTRON_VERSION

.if defined(_ELECTRON_HELPERS)
PKGJSONSDIR?=	${FILESDIR}/packagejsons

.if ${_ELECTRON_HELPERS:Mfetch}
PREFETCH_TIMESTAMP?=	0

_DISTFILE_prefetch=	${PORTNAME}-node-modules-${DISTVERSION}${EXTRACT_SUFX}
DISTFILES+=	${_DISTFILE_prefetch}:prefetch

.   if ${_NODE_VERSION} == yes
FETCH_DEPENDS+= ${PREFETCH_METHOD}:www/${PREFETCH_METHOD}
.   else
FETCH_DEPENDS+= ${PREFETCH_METHOD}:www/${PREFETCH_METHOD}-node${_NODE_VERSION}
.   endif

.if ${PREFETCH_TIMESTAMP} == 0
IGNORE= does not specify timestamp for pre-fetched modules. Please specify PREFETCH_TIMESTAMP
.endif
.endif

.if ${_ELECTRON_HELPERS:Mbuild}
BUILD_DEPENDS+=	zip:archivers/zip
.   if ${_NODE_VERSION} == yes
BUILD_DEPENDS+= ${PREFETCH_METHOD}:www/${PREFETCH_METHOD}
.	if ${PREFETCH_METHOD} == yarn
BUILD_DEPENDS+= npm:www/npm
.	endif
.   else
BUILD_DEPENDS+= ${PREFETCH_METHOD}:www/${PREFETCH_METHOD}-node${_NODE_VERSION}
.	if ${PREFETCH_METHOD} == yarn
BUILD_DEPENDS+= npm:www/npm-node${_NODE_VERSION}
.	endif
.   endif

REBUILD_NPM_CONFIG_ENV+=	npm_config_build_from_source=true \
		npm_config_nodedir=${LOCALBASE}

.if !defined(PKG_ELECTRON_VER)
IGNORE=	does not define electron version specified in the source. \
	Check package-lock.json or yarn.lock for this value
.endif
.endif

.if ${_ELECTRON_HELPERS:Mfetch}
.   if ${PREFETCH_METHOD} == npm
pre-fetch: pre-fetch-npm
pre-fetch-npm:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>  Pre-fetching and archiving node modules"; \
		${MKDIR} ${WRKDIR}/npm-cache; \
		${CP} -r ${PKGJSONSDIR}/* ${WRKDIR}/npm-cache; \
		cd ${PKGJSONSDIR} && \
		for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
			cd ${WRKDIR}/npm-cache/$${dir} && \
			${SETENV} HOME=${WRKDIR} ${NPM_CMD} ci --ignore-scripts --no-progress && \
			${RM} package.json package-lock.json; \
		done; \
		cd ${WRKDIR} && \
		${MTREE_CMD} -cbnSp npm-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./npm-cache:' > npm-cache.mtree && \
		${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} @npm-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi
.   elif ${PREFETCH_METHOD} == yarn
pre-fetch: pre-fetch-yarn
pre-fetch-yarn:
	@${MKDIR} ${DISTDIR}/${DIST_SUBDIR}
	@if [ ! -f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} ]; then \
		${ECHO_MSG} "===>  Pre-fetching and archiving node modules"; \
		${MKDIR} ${WRKDIR}; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/.yarnrc; \
		${CP} -r ${PKGJSONSDIR}/* ${WRKDIR}; \
		cd ${PKGJSONSDIR} && \
		for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
			cd ${WRKDIR}/$${dir} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				${YARN_CMD} --frozen-lockfile --ignore-scripts && \
			${RM} package.json yarn.lock; \
		done; \
		cd ${WRKDIR}; \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${PREFETCH_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./yarn-offline-cache:' > yarn-offline-cache.mtree; \
		${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${DIST_SUBDIR}/${_DISTFILE_prefetch} @yarn-offline-cache.mtree; \
		${RM} -r ${WRKDIR}; \
	fi
.   endif
.endif

.if ${_ELECTRON_HELPERS:Mextract}
.   if ${PREFETCH_METHOD} == npm
post-extract: post-extract-npm
post-extract-npm:
	@${ECHO_MSG} "===>  Copying package.json and package-lock.json to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		for f in package.json package-lock.json; do \
			if [ -f ${WRKSRC}/$${dir}/$${f} ]; then \
				${MV} -f ${WRKSRC}/$${dir}/$${f} ${WRKSRC}/$${dir}/$${f}.bak; \
			fi; \
			${CP} -f $${dir}/$${f} ${WRKSRC}/$${dir}; \
		done; \
	done
	@${ECHO_MSG} "===>  Moving pre-fetched node modules to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		${MV} ${WRKDIR}/npm-cache/$${dir}/node_modules ${WRKSRC}/$${dir}; \
	done
.   elif ${PREFETCH_METHOD} == yarn
post-extract: post-extract-yarn
post-extract-yarn:
	@${ECHO_MSG} "===>  Copying package.json and yarn.lock to WRKSRC"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		for f in package.json yarn.lock; do \
			if [ -f ${WRKSRC}/$${dir}/$${f} ]; then \
				${MV} -f ${WRKSRC}/$${dir}/$${f} ${WRKSRC}/$${dir}/$${f}.bak; \
			fi; \
			${CP} -f $${dir}/$${f} ${WRKSRC}/$${dir}; \
		done; \
	done
	@${ECHO_MSG} "===>  Installing node modules from pre-fetched cache"
	@${ECHO_CMD} 'yarn-offline-mirror "../yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
			${YARN_CMD} --frozen-lockfile --ignore-scripts --offline; \
	done
.   endif
.endif

.if ${_ELECTRON_HELPERS:Mbuild}
pre-build: pre-build-electron-zip pre-build-npm-rebuild
pre-build-electron-zip:
	# This is only to pacify electron-download and the zip file will not
	# be used for actual packaging.
	@${ECHO_MSG} "===>  Preparing distribution files of electron"
	@${MKDIR} ${WRKDIR}/electron-dist
	@cd ${LOCALBASE}/share/electron${_ELECTRON_VERSION} && \
		${TAR} -cf - . | ${TAR} -xf - -C ${WRKDIR}/electron-dist
	@cd ${WRKDIR}/electron-dist && \
		${FIND} . -type f -perm ${BINMODE} -exec ${CHMOD} 755 {} ';'
	@${MKDIR} ${WRKDIR}/.cache/electron
	@cd ${WRKDIR}/electron-dist && \
		${ZIP_CMD} -q -r ${WRKDIR}/.cache/electron/electron-v${PKG_ELECTRON_VER}-freebsd-x64.zip .
	@cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${PKG_ELECTRON_VER}

pre-build-npm-rebuild:
	@${ECHO_MSG} "===>  Rebuilding native node modules for node"
	@cd ${PKGJSONSDIR} && \
	for dir in `${FIND} . -type f -name package.json -exec dirname {} ';'`; do \
		cd ${WRKSRC}/$${dir} && \
		${SETENV} ${MAKE_ENV} ${REBUILD_NPM_CONFIG_ENV} \
		${NPM_CMD} rebuild --no-progress; \
	done
.endif
.endif # _ELECTRON_HELPERS

.if defined(_ELECTRON_VERSION)
.include "${.CURDIR}/../../devel/electron${_ELECTRON_VERSION}/Makefile.version"
.endif
