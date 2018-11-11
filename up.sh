#!/usr/bin/env bash

OLDVERSION=$(jq -r '.version' ./package.json)
read -p "New version (old was $OLDVERSION): " NEWVERSION

rm -rf lib/
git stash save 'up.sh auto-stash'
sed -i "s/$OLDVERSION/$NEWVERSION/g" package.json
git commit -S -a -m "up to $NEWVERSION" && \
	git tag -s "$NEWVERSION" -m "$NEWVERSION" && \
	git push && \
	git push --tags && \
	npm pub
rm -rf lib/
git stash pop
git reset .

# update docs
./up-docs.sh
