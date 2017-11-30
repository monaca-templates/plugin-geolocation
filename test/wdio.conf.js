const ConfigHelper = require('./ConfigHelper').ConfigHelper;
const configHelper = new ConfigHelper();

const platformToTest = 'android7'; // Valid values for this are in ConfigHelper.DESIRED_CAPABILITIES

exports.config = {
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: configHelper.getDesiredCapabilities(platformToTest),
    sync: true,
    logLevel: 'error', // silent | verbose | command | data | result | error
    coloredLogs: true,
    deprecationWarnings: false,
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'jasmine',
    reporters: ['dot'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
    }
}
