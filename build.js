const builder = require('electron-builder');
const package = require('./package.json');

builder.build({
	config: {
		"productName": "Kakin",
		"buildVersion": package.version,
		"appId": "org.bitnari.kakin",
		"asar": true,
		"files": [ "!game/**/*" ],
		"protocols": {
			"name": "kakin",
			"schemes": [
				"kakin"
			]
		},
		"win": {
			"icon": "./app/img/kakin.ico",
			"target": [{
				"target": "zip",
				"arch": [
					"ia32",
					"x64"
				]
			}]
		},
		"directories": {
			"output": "build/"
		}
	}
});
