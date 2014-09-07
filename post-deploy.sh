#!/usr/bin/env bash
echo "Remove .git directory"
rm -rf ./.git

echo "Initializing git repo and commiting the build"
now=$(date +"%s")
commit_message="build-compiled-at-$now"

git init
git add -A;
git commit -m "$commit_message"
git remote add origin https://airwolfe.git.beanstalkapp.com/unicorn.git
git fetch
git branch --set-upstream-to=origin/master master
git pull --rebase

echo "Ok, latest pulled. Just git push origin master next..."
