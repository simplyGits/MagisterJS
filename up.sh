#!/usr/bin/env bash

OLDVERSION=$(jq -r '.version' ./package.json)
read -p "New version (old was $OLDVERSION): " NEWVERSION

rm -rf lib/
git stash save
sed -i "s/$OLDVERSION/$NEWVERSION/g" package.json src/yuidoc.json
npm test && git commit -Sam "up to $NEWVERSION" && git tag -s "$NEWVERSION" && git push && git push --tags && npm pub
rm -rf lib/
git stash pop
git reset .
