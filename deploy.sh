# delete branch gh-pages
git push --delete origin gh-pages
git branch -d gh-pages

# recreate branch master
git checkout -b gh-pages HEAD
# run production build on gh-pages branch
npm run build
# delete all files except from build folder
sudo rm -rf .cache/ .circleci/ node_modules/ package.json deploy.sh .gitignore package-json.lock src/ test/ webpack.config.js .gitignore
# setup git username and email
git config --global user.name "glippi"
git config --global user.email "gabriele@lippi.net"
# commit changes
git add . && git commit -m "Run production build"
# git filter-branch --subdirectory-filter build -- gh-pages
git push origin HEAD
