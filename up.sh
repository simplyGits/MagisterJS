#!/usr/bin/env bash

OLDVERSION=$(jq -r '.version' ./package.json)
read -p "New version (old was $OLDVERSION): " NEWVERSION

git stash save
sed -i "s/$OLDVERSION/$NEWVERSION/g" package.json src/{yuidoc.json,Magister.js}
npm test && git commit -am "up to $NEWVERSION" && git tag "$NEWVERSION" && git push && git push --tags && npm pub
git stash show -p | git apply && git stash drop
git reset .
