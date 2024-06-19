#!/usr/bin/env sh
sh
#abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com'> CNAME
git init
git checkout -b main
git add -A
git commit -m 'deploy'
# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com: <USERNAME>/<USERNAME>.github.io.git main
# if you are deploying to https://carlospazsoy.github.io//P5_Frontend #git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
cd -