PORTNAME=	element-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.11.88
CATEGORIES=	net-im
MASTER_SITES=	https://github.com/${GH_ACCOUNT}/element-web/releases/download/${DISTVERSIONFULL}/:element_web \
		https://registry.npmjs.org/keytar/-/:keytar \
		https://registry.npmjs.org/matrix-seshat/-/:matrix_seshat
DISTFILES=	element-${DISTVERSIONFULL}${EXTRACT_SUFX}:element_web \
		${PREFETCH_FILE}:prefetch \
		keytar-${KEYTAR_VER}.tgz:keytar \
		matrix-seshat-${MATRIX_SESHAT_VER}.tgz:matrix_seshat

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Glossy Matrix collaboration client for desktop
WWW=		https://element.io

LICENSE=	AGPLv3 GPLv3
LICENSE_COMB=	dual
LICENSE_FILE_AGPLv3=	${WRKSRC}/LICENSE-AGPL-3.0
LICENSE_FILE_GPLv3=	${WRKSRC}/LICENSE-GPL-3.0

LIB_DEPENDS=	libsqlcipher.so:databases/sqlcipher \
		libsecret-1.so:security/libsecret

USES=		cargo desktop-file-utils electron:33 gmake nodejs:20,build \
		pkgconfig python:build

USE_GITHUB=	yes
GH_ACCOUNT=	element-hq

CARGO_CARGOTOML=${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

BINARY_ALIAS=	python3=${PYTHON_CMD}
SUB_FILES=	${PORTNAME}

PORTDOCS=	CHANGELOG.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1,fetch,extract,build appbuilder build:builder

PREFETCH_FILE=		${PORTNAME}-${DISTVERSION}-node-modules${EXTRACT_SUFX}
KEYTAR_VER=		7.9.0
MATRIX_SESHAT_VER=	4.0.0
RUST_ARCH=		${ARCH:S/amd64/x86_64/:S/i386/i686/}

pre-fetch:
	if [ ! -f ${DISTDIR}/${PREFETCH_FILE} ]; then \
		${MKDIR} ${WRKDIR}/node-modules-cache; \
		${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> \
			${WRKDIR}/node-modules-cache/.yarnrc; \
		${CP} -R ${PKGJSONSDIR}/* ${WRKDIR}/node-modules-cache; \
		for dir in . keytar matrix-seshat; do \
			cd ${WRKDIR}/node-modules-cache/$${dir} && \
			${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
				yarn install --frozen-lockfile --ignore-scripts; \
		done; \
		${FIND} ${WRKDIR}/node-modules-cache -depth 1 -print | ${GREP} -v yarn-offline-cache | \
			${XARGS} ${RM} -r; \
		cd ${WRKDIR}/node-modules-cache && \
		${MTREE_CMD} -cbnSp yarn-offline-cache | ${MTREE_CMD} -C | ${SED} \
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
	${MV} ${WRKDIR}/yarn-offline-cache ${WRKSRC}
	cd ${WRKSRC} && ${ECHO_CMD} 'yarn-offline-mirror "./yarn-offline-cache"' >> ${WRKSRC}/.yarnrc
	cd ${WRKSRC} && ${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn install --frozen-lockfile --ignore-scripts --offline
	@${MKDIR} ${WRKSRC}/.hak/hakModules/keytar ${WRKSRC}/.hak/keytar/${RUST_ARCH}-unknown-freebsd/build
	${TAR} -xf ${DISTDIR}/keytar-${KEYTAR_VER}.tgz --strip-components 1 \
		-C ${WRKSRC}/.hak/hakModules/keytar
	${TAR} -xf ${DISTDIR}/keytar-${KEYTAR_VER}.tgz --strip-components 1 \
		-C ${WRKSRC}/.hak/keytar/${RUST_ARCH}-unknown-freebsd/build
	${CP} ${PKGJSONSDIR}/keytar/yarn.lock ${WRKSRC}/.hak/keytar/${RUST_ARCH}-unknown-freebsd/build
	cd ${WRKSRC}/.hak/keytar/${RUST_ARCH}-unknown-freebsd/build && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn install --frozen-lockfile --ignore-scripts --offline
	@${MKDIR} ${WRKSRC}/.hak/hakModules/matrix-seshat ${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	${TAR} -xf ${DISTDIR}/matrix-seshat-${MATRIX_SESHAT_VER}.tgz --strip-components 1 \
		-C ${WRKSRC}/.hak/hakModules/matrix-seshat
	${TAR} -xf ${DISTDIR}/matrix-seshat-${MATRIX_SESHAT_VER}.tgz --strip-components 1 \
		-C ${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	${CP} ${PKGJSONSDIR}/matrix-seshat/yarn.lock ${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build
	cd ${WRKSRC}/.hak/matrix-seshat/${RUST_ARCH}-unknown-freebsd/build && \
		${SETENV} HOME=${WRKDIR} XDG_CACHE_HOME=${WRKDIR}/.cache \
		yarn install --frozen-lockfile --ignore-scripts --offline
	${RM} ${WRKSRC}/.yarnrc
	${MKDIR} ${WRKSRC}/deploys
	${MV} ${WRKDIR}/element-${DISTVERSIONFULL} ${WRKSRC}/deploys
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run fetch --noverify --cfgdir "element.io/release"

pre-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run hak link
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${ELECTRON_REBUILD_ENV} yarn run hak build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run hak copy
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:ts
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build:res

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 24 48 64 96 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

do-test:
	cd ${TEST_WRKSRC} && ${SETENV} ${TEST_ENV} yarn run test

.include <bsd.port.mk>
