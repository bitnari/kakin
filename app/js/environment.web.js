class WebEnvironment {
	demonstrate() {
		console.log("demo")
	}

	play(user) {
		console.log(user)
	}

	getBrand() {
		return window.document.title;
	}

	getBackground() {
		return null;
	}
}

export default WebEnvironment;
