#!/bin/bash
if [ "$TRAVIS_BRANCH" == "develop" ]; then
  mkdir $HOME/buildApk/
  mkdir $HOME/Github/

  cp -R android/app/build/outputs/apk/release/*.apk $HOME/buildApk/

  cd $HOME/Github/
  git config --global user.email "sarthak.pranesh2018@vitstudent.ac.in" 
  git config --global user.name "sarthakpranesh" 

  mkdir flappyBird
  cd flappyBird
  git init
  git remote add origin https://sarthakpranesh:$GITHUB_API_KEY@github.com/sarthakpranesh/flappyBird.git
  git checkout -b build
  cp -Rf $HOME/buildApk/* .
  git add .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER push" 
  git push origin build -f
  echo "Done"
fi