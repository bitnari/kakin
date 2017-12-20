const API_VERSION = 2;
const API_RESPONSE = {
	0: "Success",
	1: "Unknown Error while processing",
	2: "Invalid ID Format",
	3: "The part, which cannot be exist, f**ing surprising, pissing over the arirang hill and bird is singing, like " +
		"let-it-go and silent, silent night is occured.",
	4: "Wrong password",
	5: "Format of token is incorrect",
	6: "Token does not exist or expired",
	7: "Insufficient gold"
}

class Token {
	constructor(token, date = new Date()) {
		this.token = token;
		this.date = date;
	}

	renew() {
		return Gokin.renew(this.token);
	}

	get isExpired() {
		return this.date.getTime() + 10 * 60 * 1000 < Date.now();
	}
}

class StatusError extends Error {
	constructor(res) {
		super(API_RESPONSE[res])
	}
}

class Gokin {
	static async login(grade, classId, id, password) {
		try {
			const loginData = await Gokin.request('verify')({
				grade: parseInt(grade),
				class: parseInt(classId),
				id: parseInt(id),
				password})
			return User.fromToken(loginData.token);
		} catch(err) {
			throw err;
		}
	}

	static request(methodName) {
		return async (payload) => {
			const request = await fetch(`/api/v${API_VERSION}/${methodName}`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},

				method: 'post',
				body: JSON.stringify(payload)
			});

			const requestData = await request.json();

			if(requestData.res === 0) return requestData;
			else throw new StatusError(requestData.res);
		};
	}
}

class User {
	constructor(token, id, credit, gold) {
		this.id = id;
		this.credit = credit;
		this.eventCredit = gold;
		this.token = token;
	}

	async pay(amount) {
		try {
			await Gokin.request('pay')({credit: amount, token: this.token});
		} catch(err) {
			throw err;
		}
	}

	async renew() {
		try {
			await Gokin.request('renew')({token: this.token});
		} catch(err) {
			throw err;
		}
	}

	static async fromToken(token) {
		try {
			const accountData = await Gokin.request('account')({token});
			return new User(token, accountData.id, accountData.credit, accountData.gold);
		} catch(err) {
			throw err;
		}
	}
}

window.Gokin = Gokin;
export default Gokin;
