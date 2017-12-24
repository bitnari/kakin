const queryString = require('query-string');

const API_ROOT = "https://gokin.onebone.me";
const API_VERSION = 2;
const API_RESPONSE = {
	0: "Success",
	1: "Unknown Error while processing",
	2: "Invalid ID Format",
	3: "Account already exists.",
	4: "Wrong password",
	5: "Format of token is incorrect",
	6: "Token does not exist or expired",
	7: "Insufficient gold",
	8: "Invalid credit format",
	9: "Invalid request",
	10: "No such account"
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
		super(API_RESPONSE[res]);
		this.status = res;
	}
}

class Gokin {
	static async score(token, game, score) {
		try {
			await Gokin.request('score')({gameId: game, score, token});
		} catch(err) {
			console.error(err);
			throw err;
		}
	}

	static async highScore(game, limit=5) {
		try {
			console.log(game);
			const res = await Gokin.request('rank')({
				game, limit: 5
			});

			console.log(res);
			return JSON.parse(res.rank);
		} catch(err) {
			throw err;
		}
	}

	static async login(grade, classId, id, password) {
		try {
			const loginData = await Gokin.request('verify')({
				grade: parseInt(grade),
				class: parseInt(classId),
				id: parseInt(id),
				password
			});
			return User.fromToken(loginData.token);
		} catch(err) {
			throw err;
		}
	}

	static request(methodName) {
		return async (payload) => {
			const request = await fetch(`${API_ROOT}/api/v${API_VERSION}/${methodName}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: 'post',
				body: queryString.stringify(payload)
			});
			const requestData = await request.json();

			if(requestData.res === 0) return requestData;
			else throw new StatusError(requestData.res);
		};
	}
}

Gokin.StatusError = StatusError;

class User {
	constructor(token, id, name, credit, gold) {
		this.id = id;
		this.name = name;
		this.credit = credit;
		this.eventCredit = gold;
		this.token = token;
	}

	async pay(amount) {
		try {
			await Gokin.request('pay')({credit: parseInt(amount), token: this.token});
		} catch(err) {
			throw err;
		}
	}

	async score(game, score) {
		try {
			await Gokin.score(this.token, game, score);
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

	async update() {
		try {
			const accountData = await Gokin.request('account')({token: this.token});
			this.id = accountData.id;
			this.name = accountData.name;
			this.credit = accountData.credit;
			this.gold = accountData.gold;
		} catch(err) {
			throw err;
		}
	}

	static async fromToken(token) {
		try {
			const accountData = await Gokin.request('account')({token});
			return new User(token, accountData.id, accountData.name, accountData.credit, accountData.gold);
		} catch(err) {
			throw err;
		}
	}
}

export default Gokin;
