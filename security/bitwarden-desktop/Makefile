# $FreeBSD$

PORTNAME=	bitwarden-desktop
DISTVERSIONPREFIX=	v
DISTVERSION=	1.16.6
CATEGORIES=	security
MASTER_SITES=	https://github.com/tagattie/freebsd-ports/releases/download/${PORTNAME}-${DISTVERSION}/:webfonts
DISTFILES=	${PORTNAME}-npm-modules-${DISTVERSION}${EXTRACT_SUFX}:prefetch \
		${PORTNAME}-webfonts-${DISTVERSION}${EXTRACT_SUFX}:webfonts

MAINTAINER=	tagattie@yandex.com
COMMENT=	Bitwarden desktop application

LICENSE=	GPLv3
LICENSE_FILE=	${WRKSRC}/LICENSE.txt

FETCH_DEPENDS=	git:devel/git \
		npm:www/npm-node10
BUILD_DEPENDS=	zip:archivers/zip \
		app-builder:devel/app-builder \
		electron${ELECTRON_VER_MAJOR}:devel/electron${ELECTRON_VER_MAJOR} \
		node:www/node10 \
		npm:www/npm-node10
LIB_DEPENDS=	libpcre.so:devel/pcre \
		libgcrypt.so:security/libgcrypt \
		libsecret-1.so:security/libsecret
RUN_DEPENDS=	electron${ELECTRON_VER_MAJOR}:devel/electron${ELECTRON_VER_MAJOR}

USES=		desktop-file-utils gnome localbase:ldflags pkgconfig \
		python:2.7,build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	bitwarden
GH_PROJECT=	desktop
GH_TUPLE=	bitwarden:jslib:53d08067df953e7a66ebf0b972e6443e1f275d86:jslib/jslib

USE_XORG=	x11 xau xcb xdmcp xext xscrnsaver
USE_GNOME=	glib20
INSTALLS_ICONS=	yes

BINARY_ALIAS=	python=${PYTHON_CMD}

SUB_FILES=	bitwarden-desktop
SUB_LIST=	ELECTRON_VER_MAJOR=${ELECTRON_VER_MAJOR}

PORTDOCS=	CONTRIBUTING.md README.md SECURITY.md

OPTIONS_DEFINE=	DOCS

.include <bsd.port.pre.mk>
.include "${PORTSDIR}/devel/electron5/Makefile.version"

SYSTEM_ELECTRON_VER=	${ELECTRON_VER}
ELECTRON_VER_MAJOR=	${ELECTRON_VER:C/^([0-9]+)\..+$/\1/}
PKG_ELECTRON_VER=	5.0.8
# PKG_ELECTRON_VER!=	${AWK} '/devDependencies/,/}/' ${FILESDIR}/package.json | \
# 			${GREP} -e '"electron":[[:space:]]*"[\^~]\?[0-9]' | \
# 			${AWK} -F ':[[:space:]]*' '{print $$NF}' | \
# 			${SED} -e 's/[",^~]//g'

NPM_TIMESTAMP=	1578569112

pre-fetch:
	if [ ! -f ${DISTDIR}/${PORTNAME}-npm-modules-${DISTVERSION}${EXTRACT_SUFX} ]; \
		then ${MKDIR} ${WRKDIR}; \
		${CP} ${FILESDIR}/package.json ${FILESDIR}/package-lock.json \
			${WRKDIR}; \
		cd ${WRKDIR} && \
		${SETENV} HOME=${WRKDIR} npm ci --ignore-scripts --verbose --no-progress; \
		${MTREE_CMD} -cbnSp node_modules | ${MTREE_CMD} -C | ${SED} \
			-e 's:time=[0-9.]*:time=${NPM_TIMESTAMP}.000000000:' \
			-e 's:\([gu]id\)=[0-9]*:\1=0:g' \
			-e 's:flags=.*:flags=none:' \
			-e 's:^\.:./node_modules:' > node_modules.mtree; \
		${TAR} -cz --options 'gzip:!timestamp' \
			-f ${DISTDIR}/${PORTNAME}-npm-modules-${DISTVERSION}${EXTRACT_SUFX} \
			@node_modules.mtree; \
		${RM} -r ${WRKDIR}; \
	fi

post-extract:
	${MV} ${WRKDIR}/node_modules ${WRKSRC}
	${MV} ${WRKDIR}/css ${WRKSRC}/src

post-patch:
	${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/node_modules/desktop-idle/binding.gyp

pre-build:
	# setup download cache for electron-download
	# (this is only to pacify electron-download and the zip file will not be used for actual packaging)
	${MKDIR} ${WRKDIR}/.cache/electron
	cd ${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR} && \
		zip -q -r ${WRKDIR}/.cache/electron/electron-v${PKG_ELECTRON_VER}-freebsd-x64.zip .
	cd ${WRKDIR}/.cache/electron && \
		${SHA256} -r *.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${PKG_ELECTRON_VER}
	# rebuild native node modules
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_nodedir=${LOCALBASE} \
		npm rebuild --verbose --no-progress
	# manually run npm postinstall
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		npx electron-rebuild -f --version ${SYSTEM_ELECTRON_VER}
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npx gulp postinstall

do-build:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run clean:dist
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		USE_SYSTEM_APP_BUILDER=true \
		npm_config_build_from_source=true \
		npm_config_nodedir=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR}/node_headers \
		npx electron-builder --linux --dir \
		--config.electronVersion=${SYSTEM_ELECTRON_VER} \
		--config.electronDist=${LOCALBASE}/share/electron${ELECTRON_VER_MAJOR} \
		--config.buildDependenciesFromSource=true

do-install:
	${INSTALL_SCRIPT} ${WRKDIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${PREFIX}/share/applications
.for size in 16 32 48 64 128 256 512
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/resources/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME:S/-desktop//}.png
.endfor
	${MKDIR} ${STAGEDIR}${DATADIR}
	cd ${WRKSRC}/dist/linux-unpacked && \
		${COPYTREE_SHARE} resources ${STAGEDIR}${DATADIR}

do-install-DOCS-on:
	${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.post.mk>
