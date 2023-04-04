module.exports = {
    ...require('../jest/jest-preset'),
    'globalSetup': 'jest-environment-puppeteer/setup',
    'globalTeardown': 'jest-environment-puppeteer/teardown',
    'testEnvironment': 'jest-environment-puppeteer'
}
