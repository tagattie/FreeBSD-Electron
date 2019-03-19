#! /bin/sh

PATCH_CMD=gpatch
PATCH_FLAGS="-b"

WRKSRC=$1
PATCHDIR=${WRKSRC}/electron/patches/common

for p in ${PATCHDIR}/chromium/*.patch; do
    ${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC} -p1 < ${p}
done
for p in ${PATCHDIR}/boringssl/*.patch; do
	${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC}/third_party/boringssl/src -p1 < ${p}
done
for p in ${PATCHDIR}/ffmpeg/*.patch; do
	${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC}/third_party/ffmpeg -p1 < ${p}
done
for p in ${PATCHDIR}/skia/*.patch; do
	${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC}/third_party/skia -p1 < ${p}
done
for p in ${PATCHDIR}/webrtc/*.patch; do
	${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC}/third_party/webrtc -p1 < ${p}
done
for p in ${PATCHDIR}/v8/*.patch; do
	${PATCH_CMD} ${PATCH_FLAGS} -d ${WRKSRC}/v8 -p1 < ${p}
done
