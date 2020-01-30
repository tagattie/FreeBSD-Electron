# $FreeBSD$
#
# Provides support for Node.js-based ports
#
# Feature:	node
# Usage:	USES=node[:ARGS]
# Valid ARGS:	<version>, build, run, test
#
# <version>:	Indicates a specific major version of Node the port uses. When
#		omitted, the port uses the current version of Node.
#
#		Examples:
#
#			USES=node:12	# Use Node 12 LTS
#			USES=node	# Use Node Current
#
# build:	Indicates Node is needed at build time and adds it to
#		BUILD_DEPENDS.
# run:		Indicates Node is needed at run time and adds it to
#		RUN_DEPENDS.
# test:		Indicates Node is needed at test time and adds it to
#		TEST_DEPENDS.
#
# NOTE: If the port specifies none of build, run or test, we assume the port
# requires all those dependencies.
#
# Variables, which can be set by a port:
#
# USE_NODE:		Indicates a Node package manager the port uses.
#			Supported package managers are:
#
#	npm[:ARGS]	The port uses NPM as package manager.
#
#	yarn[:ARGS]	The port uses Yarn as package manager.
#
#	NOTE: A port must specify exactly a single package manager.
#
#	Valid ARGS:	fetch, extract, build, run, test
#
#		fetch:		Indicates the package manager is needed at
#				fetch time and adds it to FETCH_DEPENDS.
#		extract:	Indicates the package manager is needed at
#				extract time and adds it to EXTRACT_DEPENDS.
#		build:		Indicates the package manager is needed at
#				build time and adds it to BUILD_DEPENDS.
#		run:		Indicates the package manager is needed at
#				run time and adds it to RUN_DEPENDS.
#		test:		Indicates the package manager is needed at
#				test time and adds it to TEST_DEPENDS.
#
#				Examples:
#
#					USE_NODE=npm:fetch,build
#					USE_NODE=yarn:fetch,extract,build
#
#		NOTE: If the port specifies none of them, we assume the port
#		requires the package manager at build time only.
#
# MAINTAINER:	tagattie@yandex.com

.if !defined(_INCLUDE_USES_NODE_MK)
_INCLUDE_USES_NODE_MK=	yes

_VALID_NODE_VERSIONS=	8 10 12
_VALID_NODE_FEATURES=	npm yarn

_NODE_BASE_CMD=		node
_NPM_BASE_CMD=		npm
_NPX_BASE_CMD=		npx
_YARN_BASE_CMD=		yarn

_NODE_RELPORTDIR=	www/node
_NPM_RELPORTDIR=	www/npm
_YARN_RELPORTDIR=	www/yarn

# Detect a build, run or test time dependencies on Node
_NODE_ARGS=		${node_ARGS:S/,/ /g}
.if ${_NODE_ARGS:Mbuild}
_NODE_BUILD_DEP=	yes
_NODE_ARGS:=		${_NODE_ARGS:Nbuild}
.endif
.if ${_NODE_ARGS:Mrun}
_NODE_RUN_DEP=		yes
_NODE_ARGS:=		${_NODE_ARGS:Nrun}
.endif
.if ${_NODE_ARGS:Mtest}
_NODE_TEST_DEP=		yes
_NODE_ARGS:=		${_NODE_ARGS:Ntest}
.endif

# If the port does not specify any dependency, assume all are required
.if !defined(_NODE_BUILD_DEP) && !defined(_NODE_RUN_DEP) && \
    !defined(_NODE_TEST_DEP)
_NODE_BUILD_DEP=	yes
_NODE_RUN_DEP=		yes
_NODE_TEST_DEP=		yes
.endif

# Now _NODE_ARGS should be empty or contain a single major version
.if empty(_NODE_ARGS)	# Use Node current
_NODE_VERSION=		current
_NODE_PORTDIR=		${_NODE_RELPORTDIR}
_NPM_PORTDIR=		${_NPM_RELPORTDIR}
_YARN_PORTDIR=		${_YARN_RELPORTDIR}
.else			# Use specified major version of Node
.   if ${_VALID_NODE_VERSIONS:M${_NODE_ARGS}}
_NODE_VERSION=		${_NODE_ARGS}
_NODE_PORTDIR=		${_NODE_RELPORTDIR}${_NODE_VERSION}
_NPM_PORTDIR=		${_NPM_RELPORTDIR}-node${_NODE_VERSION}
_YARN_PORTDIR=		${_YARN_RELPORTDIR}-node${_NODE_VERSION}
.   else
IGNORE=	uses unknown USES=node arguments: ${_NODE_ARGS}
.   endif
.endif

# Detect feature (package manager) used with USE_NODE and store their arguments
.if defined(USE_NODE)
.   if ${_VALID_NODE_FEATURES:M${USE_NODE:C/\:.*//}}
_NODE_FEATURE=		${USE_NODE:C/\:.*//}
_NODE_FEATURE_${USE_NODE:C/\:.*//:tu}_ARGS= \
	${USE_NODE:C/^[^\:]*(\:|\$)//:S/,/ /g}
.   else
_INVALID_NODE_FEATURE=	${USE_NODE:C/\:.*//}
.   endif
.   if !empty(_INVALID_NODE_FEATURE)
IGNORE=	specifies unknown USE_NODE features: ${_INVALID_NODE_FEATURE}
.   endif
.endif # USE_NODE

# Detect a fetch, extract, build, run or test time dependencies on package
# manager
.if defined(_NODE_FEATURE)
.   if ${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Mfetch}
_${_NODE_FEATURE:tu}_FETCH_DEP=	yes
_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:= \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Nfetch}
.   endif
.   if ${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Mextract}
_${_NODE_FEATURE:tu}_EXTRACT_DEP=	yes
_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:= \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Nextract}
.   endif
.   if ${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Mbuild}
_${_NODE_FEATURE:tu}_BUILD_DEP=	yes
_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:= \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Nbuild}
.   endif
.   if ${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Mrun}
_${_NODE_FEATURE:tu}_RUN_DEP=	yes
_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:= \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Nrun}
.   endif
.   if ${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Mtest}
_${_NODE_FEATURE:tu}_TEST_DEP=	yes
_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:= \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS:Ntest}
.   endif
.   if !empty(_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS)
IGNORE=	uses unknown USE_NODE feature arguments: \
	${_NODE_FEATURE_${_NODE_FEATURE:tu}_ARGS}
.   endif
.endif # _NODE_FEATURE

# If the port does not specify any dependency, assume it is required at build
# time
.if !defined(_${_NODE_FEATURE:tu}_FETCH_DEP) && \
    !defined(_${_NODE_FEATURE:tu}_EXTRACT_DEP) && \
    !defined(_${_NODE_FEATURE:tu}_BUILD_DEP) && \
    !defined(_${_NODE_FEATURE:tu}_RUN_DEP) && \
    !defined(_${_NODE_FEATURE:tu}_TEST_DEP)
_${_NODE_FEATURE:tu}_BUILD_DEP=	yes
.endif

# Setup dependencies
.for stage in BUILD RUN TEST
.   if defined(_NODE_${stage}_DEP)
${stage}_DEPENDS+=	${_NODE_BASE_CMD}:${_NODE_PORTDIR}
.   endif
.endfor

.for feat in ${_VALID_NODE_FEATURES}
.   for stage in FETCH EXTRACT BUILD RUN TEST
.	if defined(_${feat:tu}_${stage}_DEP)
${stage}_DEPENDS+=	${_${feat:tu}_BASE_CMD}:${_${feat:tu}_PORTDIR}
.	endif
.   endfor
.endfor

NODE_VERSION=		${_NODE_VERSION}
NODE_PORTDIR=		${_NODE_PORTDIR}
NPM_PORTDIR=		${_NPM_PORTDIR}
YARN_PORTDIR=		${_YARN_PORTDIR}
NODE_PKG_MANAGER=	${_NODE_FEATURE}

NODE_CMD?=		${LOCALBASE}/bin/${_NODE_BASE_CMD}
NPM_CMD?=		${LOCALBASE}/bin/${_NPM_BASE_CMD}
NPX_CMD?=		${LOCALBASE}/bin/${_NPX_BASE_CMD}
YARN_CMD?=		${LOCALBASE}/bin/${_YARN_BASE_CMD}
.endif # _INCLUDE_USES_NODE_MK
