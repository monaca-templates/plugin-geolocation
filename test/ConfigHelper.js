const fs = require('fs');

const MONACA_APP_BUILDS_DIR = 'build';

const PLATFORM_APP_EXT = {
	Android: /\.apk$/,
	iOS: /\.ipa$|\.app$/
};

const DESIRED_CAPABILITIES = {
	'android7': {
		automationName: 'Appium',
		browserName: '',
		platformName: 'Android',
		platformVersion: '7',
		chromedriverExecutable: '.chromedrivers/chromedriver-2.28', // see README for more about this
		autoWebview: true,
		autoGrantPermissions: true,
		deviceName: 'any', // does not matter - Appium always chooses the first device from `adb devices`
		app: ''	// if left blank, attempt to find newest downloaded Monaca build
	},
	'android8': {
		automationName: 'Appium',
		browserName: '',
		platformName: 'Android',
		platformVersion: '8',
		chromedriverExecutable: '.chromedrivers/chromedriver-2.33', // see README for more about this
		autoWebview: true,
		autoGrantPermissions: true,
		deviceName: 'any', // does not matter - Appium always chooses the first device from `adb devices`
		app: ''	// if left blank, attempt to find newest downloaded Monaca build
	},
	'ios11': {
		automationName: 'Appium',
		browserName: '',
		platformName: 'iOS',
		platformVersion: '11.1',
		autoWebview: true,
		autoGrantPermissions: true,
		deviceName: 'iPhone 8',
		app: ''	// if left blank, attempt to find newest downloaded Monaca build
	},
};

class ConfigHelper {
	getDesiredCapabilities(platform) {
		const config = DESIRED_CAPABILITIES[platform];

		if(!config) {
			throw(`Invalid platform: ${platform}. Valid options are: ${this.getValidPlatforms()}`);
		}

		if(!config.app) {
			config.app = this.getLatestMonacaAppBuild(config.platformName);
		}

		return [config];
	}

	getValidPlatforms() {
		return Object.keys(DESIRED_CAPABILITIES);
	}

	getLatestMonacaAppBuild(platformName) {
		let appBuilds;
		try {
			appBuilds = fs.readdirSync(MONACA_APP_BUILDS_DIR);
		} catch (e) {
			throw(`Build directory not found: ${MONACA_APP_BUILDS_DIR}`);
		}

		// Find only the files that are valid for the selected platform
		const platformAppBuilds = appBuilds.filter(filename => filename.match(PLATFORM_APP_EXT[platformName]));

		if(!platformAppBuilds.length) {
			throw(`No app builds found for ${platformName}`);
		}

		// Sort the files from newest to oldest. This assumes they are in the format which
		// Monaca returns (i.e. prefixed with a timestamp).
		const sortedPlatformAppBuilds = platformAppBuilds.sort((f1, f2) => f1 < f2);

		return `${MONACA_APP_BUILDS_DIR}/${sortedPlatformAppBuilds[0]}`;
	}
}

exports.ConfigHelper = ConfigHelper;