PORTNAME=	shogihome
DISTVERSIONPREFIX=	v
DISTVERSION=	1.28.0
CATEGORIES=	games
MASTER_SITES=	https://github.com/yaneurao/YaneuraOu/releases/download/suisho5/:evalfunc
DISTFILES=	Suisho5.7z:evalfunc

MAINTAINER=	tagattie@FreeBSD.org
COMMENT=	Play Shogi with AI, analyze games, and manage records
WWW=		https://sunfish-shogi.github.io/shogihome/index.en.html

LICENSE=		GPLv3 MIT
LICENSE_COMB=		multi
LICENSE_FILE_GPLv3=	${WRKSRC}/yaneuraou/Copying.txt
LICENSE_FILE_MIT=	${WRKSRC}/LICENSE

LIB_DEPENDS=	libatspi.so:accessibility/at-spi2-core \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libsndio.so:audio/sndio \
		libdbus-1.so:devel/dbus \
		libepoll-shim.so:devel/libepoll-shim \
		libffi.so:devel/libffi \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libdrm.so:graphics/libdrm \
		libwebp.so:graphics/webp \
		libdav1d.so:multimedia/dav1d \
		libopenh264.so:multimedia/openh264 \
		libpipewire-0.3.so:multimedia/pipewire \
		libcups.so:print/cups \
		libharfbuzz.so:print/harfbuzz \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libxkbcommon.so:x11/libxkbcommon \
		libxshmfence.so:x11/libxshmfence \
		libfontconfig.so:x11-fonts/fontconfig

USES=		cargo electron:42 gl gmake gnome jpeg nodejs:24,build npm:npm xorg

USE_GITHUB=	yes
GH_ACCOUNT=	sunfish-shogi
GH_TUPLE=	electron:extract-zip:v1.0.3:extract_zip/extract-zip \
		yaneurao:YaneuraOu:V9.00:yaneuraou/yaneuraou

USE_XORG=	x11 xcb xcomposite xdamage xext xfixes xi xrandr xrender xtst
USE_GL=		gbm gl
USE_GNOME=	cairo gdkpixbuf gtk30 libxslt libxml2 pango

CARGO_CARGOTOML=${WRKSRC}/extract-zip/Cargo.toml
CARGO_CARGOLOCK=${WRKSRC}/extract-zip/Cargo.lock
CARGO_BUILD=	no
CARGO_INSTALL=	no
CARGO_TEST=	no

USE_ELECTRON=	appbuilder rebuild build:builder

ELECTRON_MAKE_FLAGS+=	--config .electron-builder.config.mjs

pre-build:
	cd ${WRKSRC}/extract-zip && \
	${SETENV} ${MAKE_ENV} ${CARGO_ENV} ${CARGO} build \
		--manifest-path ${CARGO_CARGOTOML} \
		--release --verbose --verbose
	${CP} ${CARGO_TARGET_DIR}/*/libextract_zip.so \
		${WRKSRC}/node_modules/@electron-internal/extract-zip/index.freebsd-${ELECTRON_ARCH}.node
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} npm run electron:pack

post-build:
	cd ${WRKSRC}/yaneuraou/source && \
	${SETENV} ${MAKE_ENV} ${MAKE_CMD} -j ${MAKE_JOBS_NUMBER} \
		COMPILER="${CCACHE_BIN} clang++"

do-install:
	${INSTALL_DATA} ${FILESDIR}/${PORTNAME}.desktop \
		${STAGEDIR}${DESKTOPDIR}
	${INSTALL_DATA} ${WRKSRC}/build/icon.png \
		${STAGEDIR}${PREFIX}/share/pixmaps/shogihome.png
	@${MKDIR} ${STAGEDIR}${DATADIR}
	${TAR} -cf - -C ${WRKSRC}/dist/${ELECTRON_BUILDER_APP_OUT_DIR} . | \
		${TAR} -xf - -C ${STAGEDIR}${DATADIR}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	@${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	@${RM} -r ${STAGEDIR}${DATADIR}/gen
	@${RM} -r ${STAGEDIR}${DATADIR}/node_headers
	${RLN} ${STAGEDIR}${DATADIR}/${PORTNAME} \
		${STAGEDIR}${PREFIX}/bin/${PORTNAME}
	@${MKDIR} ${STAGEDIR}${DATADIR}/resources/engines \
		${STAGEDIR}${DATADIR}/resources/engines/eval
	${INSTALL_PROGRAM} ${WRKSRC}/yaneuraou/source/YaneuraOu-by-gcc \
		${STAGEDIR}${DATADIR}/resources/engines/YaneuraOu
	${INSTALL_DATA} ${WRKDIR}/nn.bin \
		${STAGEDIR}${DATADIR}/resources/engines/eval

do-test:
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} npm run test

.include <bsd.port.mk>
