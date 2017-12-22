import Gokin from "./gokin-api";

class ElectronEnvironment {
	constructor({ipcRenderer}) {
		this.ipcRenderer = ipcRenderer;

		ipcRenderer.on('score', () => {

		});
	}

	demonstrate() {
		this.ipcRenderer.emit('demo');
	}

	play(user) {
		this.ipcRenderer.emit('play', user);
	}

	getData() {
		const queryString = location.href.replace(/\?(.*)$/, '$1');

		return JSON.parse(atob(queryString));
	}

	getBrand() {
		return this.getData().name;
	}

	getBackground() {
		return this.getData().background;
	}
}

window.ElectronEnvironment = ElectronEnvironment;
