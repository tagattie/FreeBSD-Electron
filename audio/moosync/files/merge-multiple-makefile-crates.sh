#! /bin/sh

PATH=/bin:/usr/bin:/usr/local/bin

cat $@ | \
    sed -E 's/^CARGO_CRATES=\t+/\t\t/; s/ \\$//' | \
    sort | \
    uniq | \
    sed -e '1s/^\t\t/CARGO_CRATES=\t/; s/$/ \\/' | \
    sed -e '$s/ \\//'
