#! /bin/sh

PATH=/bin:/usr/bin:/usr/local/bin

PATCH_CMD="git apply"
#PATCH_FLAGS="--numstat --check" # for debugging
PATCH_FLAGS="--verbose --reject"

WRKSRC=$1
PATCH_CONF=${WRKSRC}/electron/patches/common/config.json

PATCHD_REPOD_PAIRS=$(cat ${PATCH_CONF} | \
                         sed -e '1d; $d; /^$/d; s/[",]//g; s/:  */:/')
for prp in ${PATCHD_REPOD_PAIRS}; do
    pd=$(echo ${prp} | awk -F: '{print $1}' | sed -e 's/src/./')
    rd=$(echo ${prp} | awk -F: '{print $2}' | sed -e 's/src/./')
    (cd "${WRKSRC}/${rd}" && \
         for p in `cat "${WRKSRC}/${pd}/.patches"`; do
             ${PATCH_CMD} ${PATCH_FLAGS} "${WRKSRC}/${pd}/${p}"
         done)
done
