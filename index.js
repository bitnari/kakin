const {app, BrowserWindow, ipcMain, protocol} = require('electron');
const {exec} = require('child_process')
const fs = require('fs');
const path = require('path');

let mainWindow, currentUser, currentProcess, currentScore, payingInProcess = false;

const parseGameData = (gameData) => {
	lines = gameData.split(/\r?\n/);
	return {
		identifier: lines[0],
		name: lines[1],
		background: path.resolve('./game', lines[2]),
		start: path.resolve('./game', lines[3])
	};
};

const gameData = parseGameData(fs.readFileSync(path.resolve('./game', 'game.dat'), 'utf-8'));

const createWindow = () => {
	mainWindow = new BrowserWindow({width: 1280, height: 720});
	mainWindow.loadURL(`kakin://kakin/${gameData.identifier}/?${
		Buffer(JSON.stringify(gameData), 'binary').toString('base64')
	}`);

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
};

ipcMain.on('play', (user) => {
	if(currentUser) return;
	mainWindow.close();

	currentUser = user;
	currentProcess = exec(`python ${gameData.start}`);
	currentProcess.stdout.on('data', (chunk) => {
		if(!chunk.startsWith('kakin:do-method:')) return;

		const method = chunk.split(':').slice(2);

		switch(method[0]) {
			case "pay":
				if(payingInProcess) break;

				payingInProcess = true;
				ipcMain.emit('pay', parseInt(method[1]));

				ipcMain.once('pay-data', (result) => {
					payingInProcess = false;
					currentProcess.stdin.write(result.toString());
				});
				break;

			case "score":
				currentScore = parseInt(method[1]);
		}
	});

	currentProcess.on('close', (closed) => {
		mainWindow.show();

		ipcMain.send('score', {
			token: currentUser.token,
			score: currentScore
		});

		currentProcess = null;
		currentUser = null;
		currentScore = 0;
	});
});

ipcMain.on('demo', () => {

	if(currentUser) return;
	currentUser = null;
	currentProcess = exec(`python ${gameData.start}`);

	setTimeout(() => {
		mainWindow.show();
		currentProcess.kill();
		ipcMain.emit('demo-end');

		currentUser = null;
		currentProcess = null;
	}, 20000);

	mainWindow.close();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('ready', () => {
	protocol.registerFileProtocol('kakin', (req, cb) => {
		const requestPath = req.url.replace(/^kakin:\/\/kakin\//, '').replace(/\?.*/, '');

		if(/^[a-z0-9-]+\/$/.test(requestPath)) {
			cb(path.normalize(path.join(__dirname, 'electron.html')));
			return;
		}

		const fullUrl = path.normalize(path.join(__dirname, requestPath));
		cb(fullUrl);
	});

	createWindow();
});
