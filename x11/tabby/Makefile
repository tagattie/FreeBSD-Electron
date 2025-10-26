# Notes for port maintainer
#
# Before copying package.json and yarn.lock to ${PKGJSONSDIR}, do the following steps:
# 1. Downgrade electron-builder to 25 (from 26) in ${WRKSRC}
#    (electron-builder 26 appears to have some issues with packaging node_modules)
#   $ yarn upgrade --ignore-scripts 'electron-builder@^25'

PORTNAME=	tabby
DISTVERSIONPREFIX=	v
DISTVERSION=	1.0.228
CATEGORIES=	x11

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Terminal for a more modern age
WWW=		https://tabby.sh

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE

FETCH_DEPENDS=	git:devel/git
BUILD_DEPENDS=	npm${NODEJS_SUFFIX}>0:www/npm${NODEJS_SUFFIX}
LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
		libsnappy.so:archivers/snappy \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libsndio.so:audio/sndio \
		libdbus-1.so:devel/dbus \
		libepoll-shim.so:devel/libepoll-shim \
		libevent.so:devel/libevent \
		libffi.so:devel/libffi \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libpcre2-8.so:devel/pcre2 \
		libdrm.so:graphics/libdrm \
		libpng.so:graphics/png \
		libwayland-client.so:graphics/wayland \
		libwebp.so:graphics/webp \
		libpython${PYTHON_VER}.so:lang/python${PYTHON_SUFFIX} \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libpipewire-0.3.so:multimedia/pipewire \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence

USES=		cargo electron:38 gl gmake gnome iconv:wchar_t jpeg \
		localbase:ldflags nodejs:22,build pkgconfig python:build xorg

USE_GITHUB=	yes
GH_ACCOUNT=	Eugeny
# For GH_TUPLE, look for version in ${WRKSRC}/app/node_modules/russh/package.json,
# and search corresponding commit hash at https://github.com/Eugeny/russh-napi
GH_TUPLE=	Eugeny:russh-napi:727dced7a1186a44433c76428e87518002181527:russh_napi/russh-napi

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf gtk30 libxml2 libxslt pango

CARGO_CARGOTOML=${WRKSRC}/russh-napi/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/russh-napi/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

BINARY_ALIAS=	python3=${PYTHON_CMD}

PORTDOCS=	HACKING.md README.md

OPTIONS_DEFINE=	DOCS

USE_ELECTRON=	npm:yarn1 appbuilder:devel prefetch extract build:builder

post-patch:
	@${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/app/node_modules/@serialport/bindings-cpp/binding.gyp
	@${REINPLACE_CMD} -e 's/OS=="linux"/& or OS=="freebsd"/' \
		${WRKSRC}/app/node_modules/fontmanager-redux/binding.gyp
	@${REINPLACE_CMD} -e 's/%%DISTVERSIONFULL%%/${DISTVERSIONFULL}/' \
		${WRKSRC}/scripts/vars.mjs

pre-build:
	cd ${WRKSRC}/russh-napi && \
		${SETENV} ${MAKE_ENV} ${CARGO_ENV} \
		${CARGO} build --release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/*/librussh_napi.so \
		${WRKSRC}/app/node_modules/russh/russh.freebsd-${ELECTRON_ARCH}.node
	for dir in ${WRKSRC} ${WRKSRC}/app ${WRKSRC}/tabby-terminal; do \
		cd $${dir} && ${SETENV} ${MAKE_ENV} yarn exec patch-package; \
	done
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${NODEJS_REBUILD_ENV} node scripts/install-deps.mjs
	${CP} ${WRKSRC}/app/node_modules/glasstron/src/platforms/linux.js \
		${WRKSRC}/app/node_modules/glasstron/src/platforms/freebsd.js
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ${ELECTRON_REBUILD_ENV} node scripts/build-native.mjs
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} yarn run build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} node scripts/prepackage-plugins.mjs

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop ${STAGEDIR}${DESKTOPDIR}
.for size in 16 32 64 128 256 512
	@${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps
	${INSTALL_DATA} ${WRKSRC}/build/icons/${size}x${size}.png \
		${STAGEDIR}${PREFIX}/share/icons/hicolor/${size}x${size}/apps/${PORTNAME}.png
.endfor
	@${MKDIR} ${STAGEDIR}${DATADIR}
	${TAR} -cf - -C ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} . | \
		${TAR} -xf - -C ${STAGEDIR}${DATADIR}
	${FIND} ${STAGEDIR}${DATADIR}/resources -type f -perm 755 -exec ${FILE} {} ';' | \
		${GREP} 'ELF.*FreeBSD' | ${AWK} -F ': ' '{print $$1}' | ${XARGS} ${STRIP_CMD}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	${RM} -r ${STAGEDIR}${DATADIR}/gen
	${RM} -r ${STAGEDIR}${DATADIR}/node_headers
	${RLN} ${STAGEDIR}${DATADIR}/${PORTNAME} ${STAGEDIR}${PREFIX}/bin

do-install-DOCS-on:
	@${MKDIR} ${STAGEDIR}${DOCSDIR}
	${INSTALL_MAN} ${PORTDOCS:S|^|${WRKSRC}/|} ${STAGEDIR}${DOCSDIR}

.include <bsd.port.mk>
