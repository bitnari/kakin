import Gokin from "./gokin-api";
import swal from "sweetalert2";

class ElectronEnvironment {
	constructor({ipcRenderer}) {
		this.ipcRenderer = ipcRenderer;
		this.gameData = JSON.parse(atob(location.href.match(/\?(.*)$/)[1]));
		this.closeRequested = false;

		ipcRenderer.on('score', ({token, score}) => {
			(async () => {
				try{
					await Gokin.score(token, this.id, score);
					swal("점수가 등록되었습니다.", `${score}점을 기록하셨습니다. 플레이해주셔서 감사합니다. :D`, 'info');
				} catch (err) {
					swal("점수 등록 중에 오류가 발생했습니다 T_T", "카운터에 방문해주세요.", "error");
					localStorage.setItem("score-error", `id: ${this.id}, score: ${score}, token: ${token}`);
				}
			})();
		});

		ipcRenderer.on('demo-end', () => {
			swal("데모가 끝났습니다!", "데모 플레이가 종료되었습니다." +
				"<br>더 플레이하시고 싶다면 로그인 후 플레이 해주세요! :D", "info");
		});

		ipcRenderer.on('close', () => {
			this.closeRequested = true;
			ipcRenderer.send('close');
		});

		window.onbeforeunload = () => {
			if(this.closeRequested) {
				return;
			}

			return false;
		};

		document.title = this.id;
	}

	demonstrate() {
		this.ipcRenderer.send('demo');
	}

	play(user) {
		this.ipcRenderer.send('play', user);
	}

	getBrand() {
		return this.gameData.name;
	}

	getBackground() {
		return this.gameData.background;
	}

	get id() {
		return this.gameData.identifier;
	}
}

export default ElectronEnvironment;
