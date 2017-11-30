# Geolocation Plugin Demo

This repository contains a simple project which demonstrates how to use the `cordova-plugin-geolocation` plugin with Monaca.

The project shows how to get the user's location one time, and also watch it for changes. It also demonstrates how to use this information to display the location on a map, and calculate the distance from other places.

The project has been tested with version 2.4.3 of the plugin on the following devices:

 - iPhone X (iOS 11.1.1)
 - Nexus 5X (Android 8.0)
 - Galaxy S4 (Android 4.4.2)

## Automated Testing

Automated testing of this app is done using [Appium](https://appium.io/) and [WebdriverIO](http://webdriver.io/).

### Setup

First, you need to install the dependencies:

```
npm install
```

There are various things that need to be configured so that Appium can be run correctly. Appium provides a tool called `appium-doctor`, which can check these for you. It is included as a dependency of this project. If anything extra needs to be set up, it will give you instructions on how to do it.

```
npm run appium-doctor
```

### Running tests

All the testing is controlled by WebdriverIO (`wdio`). It also runs Appium in the background, which controls the device itself.

#### Configuration

All of the configuration for WebdriverIO is set up in `test/wdio.conf.js`. The only value you should need to change here is `platformToTest`. This determines which kind of device to test on. Valid values can be found in `ConfigHelper.js` under `DEVICE_CAPABILITIES`.

By default, the tests here are configured to look for app builds in the `build` folder that have come from [Monaca](https://monaca.io/). You can specify a specific build to use instead by editing the `app` key in `DESIRED_CAPABILITIES`.

#### Running

Once this is configured, start the emulator or connect the device you want to test on. Then run:

```
npm run test
```

This will run through all tests in `test/specs`. For this project, WebdriverIO has been set up to use [Jasmine](https://jasmine.github.io/) for writing the tests. This makes the tests more readable, and also gives good feedback when a test fails.

### Troubleshooting

#### iOS Simulator App Closes Immediately
The iOS Simulator cannot run `.ipa` files that have been built to run on a device. The app will install, but then close immediately once it is launched. Instead you will need to build a `.app` file, which can be run on the simulator. Currently Monaca does not support this, but it can be done locally using `monaca build ios`.

#### Android Chromedriver

Appium ships with the latest Chromedriver version, which typically will only work on the very specific versions of Android. To test on older (or very new) versions, you must download another Chromedriver, and tell Appium to use it in your `DESIRED_CAPABILITIES`.

You can download all Chromedriver versions at https://chromedriver.storage.googleapis.com/index.html. Unzip and copy to your project. We recommend putting them in a `.chromedriver` folder, and renaming the executables to include their version number. Then you can add a line like this to your `DESIRED_CAPABILITIES`:

```
chromedriverExecutable: '.chromedrivers/chromedriver-2.28'
```

#### Appium logs
For a lot of detail on how Appium is controlling the device, you can check the logs. They are output to `appium.log` in the project root.

#### Real devices
For any problems testing on real devices, see the Appium docs on [Support for Real Device Testing](https://appium.readthedocs.io/en/stable/en/appium-setup/real-devices/).
