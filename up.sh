#!/usr/bin/env bash

OLDVERSION=$(jq -r '.version' ./package.json)
read -p "New version (old was $OLDVERSION): " NEWVERSION

git stash save
sed -i "s/$OLDVERSION/$NEWVERSION/g" package.js{on,} src/{yuidoc.json,Magister.coffee}
grunt
mocha && git commit -am "grunt & up to $NEWVERSION" && git tag "$NEWVERSION" && git push && git push --tags && meteor publish && npm pub
git stash show -p | git apply && git stash drop
git reset .
