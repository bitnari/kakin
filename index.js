const {app, BrowserWindow, ipcMain, protocol} = require('electron');
const {spawn} = require('child_process')
const fs = require('fs');
const path = require('path');

let currentUser, currentProcess, currentScore;
let mainWindow, demoWindow, webWindow;
let payingInProcess = false;
let quitOnEnd = false;

// unix-style normalize
const unormalize = (str) => {
	return path.normalize(str).replace(/\\/g, '/');
};

const parseGameData = (gameData) => {
	lines = gameData.split(/\r?\n/);
	return {
		type: lines[0],
		identifier: lines[1],
		name: lines[2],
		background: unormalize(path.join('/game', lines[3])),
		start: lines[4]
	};
};

const gameData = parseGameData(fs.readFileSync(path.resolve('./game', 'game.dat'), 'utf-8'));

const createWindow = (cb = () => {}) => {
	mainWindow = new BrowserWindow({width: 1280, height: 720, frame: false});
	mainWindow.maximize();
	mainWindow.setKiosk(true);
	mainWindow.setAlwaysOnTop(true);
	mainWindow.webContents.once('did-finish-load', cb);
	mainWindow.loadURL(`kakin://kakin/${gameData.identifier}/?${
		Buffer.from(encodeURIComponent(JSON.stringify(gameData)), 'utf8').toString('base64')
	}`);
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
};

const closeWindow = () => {
	ipcMain.once('close', () => mainWindow.close());
	mainWindow.webContents.send('close');
};

ipcMain.on('shutdown', () => {
	quitOnEnd = true;
});

ipcMain.on('devtool', () => {
	mainWindow.toggleDevTools();
});

ipcMain.on('play', (ev, user) => {
	if(currentUser) return;
	closeWindow();

	currentUser = user;

	if(gameData.type === 'web') {
		webWindow = new BrowserWindow({
			width: 1280,
			height: 720,
			toolbar: false,
			frame: false
		});

		webWindow.maximize();
		webWindow.setKiosk(true);
		webWindow.loadURL(`kakin://kakin/web?${
			Buffer.from(`${encodeURIComponent(gameData.start)}#${
				Buffer.from(encodeURIComponent(currentUser.name), 'utf8').toString('base64')
			}`, 'utf8').toString('base64')
		}`);

		ipcMain.once('play-finished', (ev, score) => {
			ipcMain.once('close', () => {
				webWindow.close();
				createWindow(() => {
					mainWindow.webContents.send('score', {
						token: currentUser.token,
						score
					});

					currentUser = null;
				});
			});
			webWindow.webContents.send('close');
		});

		return;
	}

	currentProcess = spawn('python', [gameData.start], {
		cwd: path.resolve('./game')
	});

	currentProcess.stdout.on('data', (chunk) => {
		chunk = chunk.toString();
		if(!chunk.startsWith('kakin:do-method:')) return;

		const method = chunk.split(':').slice(2);

		switch(method[0]) {
			case "pay":
				if(payingInProcess) break;

				payingInProcess = true;
				mainWindow.webContents.send('pay', parseInt(method[1]));

				ipcMain.once('pay-data', (ev, result) => {
					payingInProcess = false;
					currentProcess.stdin.write(result.toString());
				});
				break;

			case "score":
				currentScore = parseInt(method[1]);
		}
	});

	currentProcess.on('close', (closed) => {
		createWindow(() => {
			mainWindow.webContents.send('score', {
				token: currentUser.token,
				score: currentScore
			});
			currentUser = null;
			currentScore = 0;
		});
		currentProcess = null;
	});
});

ipcMain.on('demo', () => {
	if(currentUser) return;
	if(gameData.type === 'web') return;

	currentUser = {demo: true};
	currentProcess = spawn('python', [gameData.start], {
		cwd: path.resolve('./game')
	});

	demoWindow = new BrowserWindow({
		width: 250,
		height: 250,
		transparent: true,
		frame: false,
		toolbar: false
	});
	demoWindow.loadURL('kakin://kakin/demo');
	demoWindow.setAlwaysOnTop(true);
	demoWindow.center();

	setTimeout(() => {
		createWindow(() => {
			mainWindow.webContents.send('demo-end');
		});

		demoWindow.close();

		currentProcess.kill();

		currentUser = null;
		currentProcess = null;
	}, 20000);

	closeWindow();
});

app.on('window-all-closed', () => {
	if(quitOnEnd) {
		app.quit();
		return;
	}

	if(!currentUser) {
		createWindow()
	}
});

app.on('ready', () => {
	protocol.registerFileProtocol('kakin', (req, cb) => {
		const requestPath = req.url
			.replace(/^kakin:\/\/kakin\//, '')
			.replace(/\?.*/, '').replace(/\#.*/, '');

		if(requestPath === 'demo') {
			cb(path.resolve(__dirname, 'views', 'demo.html'));
			return;
		}

		if(requestPath === 'web') {
			cb(path.resolve(__dirname, 'views', 'web.html'));
			return;
		}

		if(/^[a-z0-9-]+\/$/.test(requestPath)) {
			cb(path.resolve(__dirname, 'views', 'electron.html'));
			return;
		}

		if(requestPath === 'favicon.ico') {
			cb(path.resolve(__dirname, 'app', 'img', 'kakin.ico'));
			return;
		}

		if(requestPath === 'favicon.png') {
			cb(path.resolve(__dirname, 'app', 'img', 'kakin.png'));
			return;
		}

		const fullUrl = path.resolve(__dirname, requestPath);
		cb(fullUrl);
	});

	createWindow();
});
