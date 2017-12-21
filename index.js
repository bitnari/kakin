const {app, BrowserWindow, ipcMain} = require('electron');
const {exec} = require('child_process')
const fs = require('fs');
const path = require('path');

let mainWindow, currentUser, currentProcess, currentScore, payingInProcess = false;
const gameData = parseGameData(fs.readFileSync(path.resolve('./game', 'game.dat'), 'utf-8'));

const createWindow = () => {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
};

const parseGameData = (gameData) => {
	lines = gameData.split(/\r?\n/);
	return {
		identifier: lines[0],
		name: lines[1],
		background: path.resolve('./game', lines[2]),
		start: path.resolve('./game', lines[3])
	};
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
				ipcMain.send('pay', parseInt(method[1]));

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
		ipcMain.send('score', {
			token: currentUser.token,
			score: currentScore
		});
		
		currentProcess = null;
		currentUser = null;
		currentScore = 0;
		createWindow();
	});
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('ready', () => {
	createWindow();
});
