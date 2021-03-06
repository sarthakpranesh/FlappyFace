<div align='center'>

<img src="./readmeHeader.png" title="Flappy RNB" />

# Flappy RNB

[![Build Status](https://travis-ci.com/sarthakpranesh/flappyBird.svg?branch=master)](https://travis-ci.com/sarthakpranesh/flappyBird)
[![GitHub top language](https://img.shields.io/github/languages/top/sarthakpranesh/flappyBird)](https://github.com/sarthakpranesh/flappyBird/search?l=javascript&type=Code)
[![GitHub issues](https://img.shields.io/github/issues/sarthakpranesh/flappyBird)](https://github.com/sarthakpranesh/flappyBird/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/sarthakpranesh/flappyBird)](https://github.com/sarthakpranesh/flappyBird/pulls)
[![GitHub All Releases](https://img.shields.io/github/downloads/sarthakpranesh/flappyBird/total)](https://github.com/sarthakpranesh/flappyBird/releases)
[![GitHub](https://img.shields.io/github/license/sarthakpranesh/flappyBird)](https://github.com/sarthakpranesh/flappyBird/blob/master/LICENSE)

## The popular classic Flappy Bird game clone called Flappy RNB build in React Native

</div>

## Major Changes Underway
Why? Well `React Native` and it's community has come a long way from when this project was build and I wish to use all the new goodies available in this app. Also this project is kinda a clone of the classic Flappy Bird game, I wish to introduce something unique in the app that will make the old classic game concept of flappy bird even better. Following is the list of changes I am going to make (but not limited to):

- Update all libraries being used in the app, (including React Native)
- Implement new concept of Flappy Face: ask for users image and use a cached lighter version of their image instead of the bird
- Improve the animations: Possibly refactor the game engine implementation or look for more efficient light weight game engines
- Refactor some other outdated code


## For Developers
Make sure you have your React Native environment setup, if not please setup your environment from [here](https://reactnative.dev/docs/environment-setup).

The project uses firebase for providing many functionalities. Hence you'll need to start a firebase project and download your own `google-services.json` file and place it in `android/app/google-services.json`. Please follow the guide [here](https://rnfirebase.io/), also make sure you go through the setup required for Google OAuth from [here](https://rnfirebase.io/auth/social-auth#google)

1. git clone https://github.com/sarthakpranesh/flappyBird.git
2. cd flappyBird
3. yarn
4. yarn start
5. yarn android
(Make sure you run `yarn start` and leave the bundler running and then run `yarn android` on another terminal window)

## Looking To Contribute
All contributions are welcomed. Please follow the below key points!

Before you start your awesome work make sure you follow the below steps
1. Create your own Fork of the flappyBird repo
2. Create a new branch with a branch-name that starts with your name followed by what feature/issue you are going to add/resolve.
3. Now let your work begin in this new branch and make sure you follow the code style of the project.
4. Once you are done, Send us a pull request on the develop branch on the main flappyBird repo.

Some key points
- Each feature/issue you work with should have a different branch which should follow the stated naming convention
- Make sure you regularly pull changes from the develop branch, as it will be kept up to date with latest changes.



## Having Issues
This project uses [GitHub Issues](https://github.com/sarthakpranesh/flappyBird/issues) for tracking bugs and feature requests, so feel free to open one if you find any :)
