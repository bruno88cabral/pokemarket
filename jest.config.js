const { defaults } = require('jest-config');

module.exports = {
	setupFilesAfterEnv: ['./setupTests.js'],
	testPathIgnorePatterns: ['/node_modules'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy'
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions],
	collectCoverage: true
};