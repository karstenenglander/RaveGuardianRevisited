# RaveGuardianRevisited

## Basic Setup

Download Node.js from https://nodejs.org/en and run installer

Then, open cmd and type:

`node -v`

`npm -v`

If both return a version, you have successfully installed Node.js and npm (JS package manager).

Follow steps 1 & 2 in `https://github.com/karstenenglander/RaveGuardianRevisited/blob/main/git-instructions.md` and ensure that you are in the RaveGuardianRevisited directory.
Once you have successfully cloned the project files from the Github repo and navigated to the folder in cmd, run:

`npm install`

`npx expo start`

## Create a new project (not recommended)

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
