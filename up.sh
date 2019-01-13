#!/usr/bin/env bash

if [[ `git status --porcelain --untracked-files=no` ]]; then
	echo untracked files, aborting...
	exit 1
fi

OLDVERSION=$(jq -r '.version' ./package.json)
read -p "New version (old was $OLDVERSION): " NEWVERSION

rm -rf lib/
sed -i "s/$OLDVERSION/$NEWVERSION/g" package.json
git commit -S -a -m "up to $NEWVERSION" && \
	git tag -s "$NEWVERSION" -m "$NEWVERSION" && \
	git push && \
	git push --tags && \
	npm pub
rm -rf lib/
git reset .

# update docs
./up-docs.sh
