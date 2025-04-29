# RaveGuardianRevisited

## Basic Setup

Download Node.js from https://nodejs.org/en and run installer

Then, open cmd and type:

`node -v`

`npm -v`

If both return a version, you have successfully installed Node.js and npm (JS package manager).

Then traverse to a directory of your choice and run:

`git clone https://github.com/karstenenglander/RaveGuardianRevisited`

Then type:

`cd RaveGuardianRevisited`

Once you have successfully cloned the project files from the Github repo and navigated to the folder in cmd, run:

`npm install`

At this stage you will need our Firebase config file, however, for security purposes we do not store this in our repository. If you believe that you are entitled to use our Firebase API keys, please reach out to one of the developers.
If you wish to use your own API keys, we have provided the structure of our firebaseConfig.js file at the end of this readme.

`npx expo start`

## Github Instructions

First open the Github repo, and press the fork button, create a fork and add a description.
Once created, ensure that the fork is up-to-date by pressing the Sync fork button.
Run the git clone command USING YOUR FORK

`git clone <forked_repo_url>`

`cd <fordked_repo_name>`

`git remote add upstream <original_repo_url>`

Then to begin working you must:

`git checkout -b <feature_branch_name>`

Then use VSCode source control or Gitlens to stage and commit a change.
Once a commit is made, you push the commit through source control, and publish the branch TO UPSTREAM

Once the branch is merged into main, in order to update your code, run:

`git checkout main`

`git pull upstram main`

Then you should update the forked repo:

`git push origin main`

## Create a new project

Then run:

`npm install -g expo-cli`

Then open VSCode, click file, open folder, create a new folder in your desired directory, and select it to use as the base folder.
Once this is done, press terminal at the top, and create new terminal.
In this terminal, navigate to the correct directory and run the command:

`npx create-expo-app AppName --template` You may replace AppName with the name of your folder, for simplicity, you may use our project name, RaveGuardianRevisited.

You may be prompted to install ExpoAppCreate or something like this, just press y and continue.
You must also ensure that you select the blank template, not the blank typeScript template though.

Once you have done this, navigate to the project folder in VSCode and open App.js, here you may edit the primary functionality of the app.

When you are ready to run the app, open the terminal, navigate to the project folder and run the command:

`npx expo start`

Once you have run this command, you may scan the QR code with your phone (only after downloading Expo Go from the App Store).
It should then open the app and allow you to view the app on your phone.

You should be able to hit CTRL + S in VSCode to save code and it should push immediately to your phone.

If you wish to end this process, you simply close the app as well as the terminal in VSCode.

## Android Version

Before running the app on an Android device, you must install Android Studio:

Download and install Android Studio: https://developer.android.com/studio

During installation, make sure to install:

Android SDK

Android SDK Command-line Tools

Android Emulator (optional, if you want to use a virtual device)

Add Android SDK to your system PATH if prompted during installation.

### Device Setup

If using a physical Android device:

Enable Developer Options and USB Debugging on the device.

Connect it to your computer via USB cable.

Accept the USB Debugging Authorization prompt that appears.

### Steps to Run the App on Android

Open a terminal in the project directory.

Start the development server: npx expo start

In the terminal after the QR code appears, press:

s (to switch to development build mode)

a (to open on Android device)

This will launch the app natively on your connected Android phone. No Expo Go app is required.

Pressing a before pressing s will have the Android phone attempt to install expo go.

## Firebase Config

Before running `npx expo start` you need to add the `firebaseConfig.js` file.
In order to do this, create a new js file named `firebaseConfig.js` and paste the following:

`// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth =
  getApps().length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(app);

const db = getFirestore(app);

export { app, auth, db };`

PLEASE NOTE: This firebaseConfig.js file does NOT contain the actual key values, those will need to be entered manually.

