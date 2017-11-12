<template>
	<form @submit="handleLogin($event)" class="submit-box" v-show="!loggedIn" key="login">
		<kn-box class="login-box" column>
			<kn-box class="login-jumbotron">Welcome!</kn-box>
			<kn-box class="in-box" column>
				<kn-box class="id-box">
					<kn-textbox text="학년" type="number"></kn-textbox>
					<kn-textbox text="반" type="number"></kn-textbox>
					<kn-textbox text="번호" type="number"></kn-textbox>
				</kn-box>
				<kn-textbox text="비밀번호" type="password"></kn-textbox>
			</kn-box>
			<kn-button class="button">
				<kn-icon icon="ios-send-outline"></kn-icon>
			</kn-button>
		</kn-box>
	</form>
</template>

<style scoped>
	@import "theme";
	
	.submit-box {
		position: relative;
	}

	.login-box {
		background: var(--white-darken-1);
		width: 400px;
		height: 400px;
	}

	.in-box {
		padding: 5px 10px;
		background: var(--white-darken-1);
	}

	.id-box * {
		width: 0;
		flex: 1;
	}

	.login-jumbotron {
		background: var(--blue);
		font-weight: 100;
		font-size: 2rem;
		padding: 10px 30px;
		color: var(--white);
		align-items: flex-end;
		height: 130px;
	}

	.button {
		flex: 1;
		font-size: 2rem !important;
		color: var(--white);
		background: var(--blue) !important;
		margin: 15px;
		margin-top: 5px;
	}
</style>

<script>
	import KnBox from "../components/KnBox.vue";
	import KnButton from "../components/KnButton.vue";
	import KnIcon from "../components/KnIcon.vue";
	import KnTextbox from "../components/KnTextbox.vue";

	export default {
		components: {
			KnBox,
			KnButton,
			KnIcon,
			KnTextbox
		},

		methods: {
			handleLogin(ev) {
				this.$store.commit('login', {
					username: "Khinenw",
					credit: 0,
					eventCredit: 0
				});

				ev.preventDefault();
			}
		}
	}
</script>
