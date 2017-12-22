class WebEnvironment {
	static demonstrate() {
		console.log("demo")
	}

	static play(user) {
		console.log(user)
	}

	static getBrand() {
		return window.document.title;
	}

	static getBackground() {
		return null;
	}
}

export default WebEnvironment;
