<template>
	<kn-main :brand="brand">
		<kn-box class="main-box" :style="backgroundStyle">
			<div class="background-tint"></div>

			<transition name="login-fade" mode="out-in">
				<component :is="context"></component>
			</transition>
		</kn-box>

		<transition name="fade" mode="out-in">
			<kn-box class="score-box" v-if="highScore" column>
				<kn-box class="score-content leaderboard">
					<span class="score">
						Leaderboard
					</span>
				</kn-box>

				<template v-for="score, index in highScore">
					<kn-box class="score-content">
						<span class="rank"># {{index + 1}}</span>
						<span class="name">{{score.name}}</span>
						<span class="score">{{score.score}}</span>
					</kn-box>
				</template>
			</kn-box>
		</transition>
		<span id="version">Kakin v1.0.2</span>
	</kn-main>
</template>

<style scoped>
	@import "theme";

	#version {
		position: fixed;
		bottom: 30px;
		left: 30px;
		font-family: var(--font);
		color: #f1f2f3;
		font-size: 1.2rem;
		background: rgba(0, 0, 0, .5);
		padding: 10px;
	}

	.main-box {
		align-items: center;
		justify-content: center;
		flex: 1;
		position: relative;
		background-size: cover;
	}

	.score-box {
		position: fixed;
		bottom: 30px;
		right: 30px;
		padding-top: 10px;
		background: linear-gradient(45deg, #202020, #303030);
		/* background: linear-gradient(45deg, #0a1b33, #0d2956); */
		/* background: rgba(255, 255, 255, .5); */
		font-family: var(--font);
		color: #f1f2f3;
		font-size: 1.2rem;
	}

	.score-content {
		/* border-radius: 5px; */
		padding-left: 10px;
		padding-right: 10px;
		justify-content: center;
		/* background: #ff9800; */

		&.leaderboard {
			color: #ff1744;
		}

		&:nth-child(2) {
			background: #f44336;
		}

		&:nth-child(3) {
			background: #e53935;
		}

		&:nth-child(4) {
			background: #d32f2f;
		}

		&:nth-child(5) {
			background: #c62828;
		}

		&:nth-child(6) {
			background: #b71c1c;
		}

		& * {
			padding: 10px;
			white-space: nowrap;
			flex: 1;
		}
	}

	.background-tint {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--background-color);
		opacity: .2;
	}

	.login-fade-enter-active {
		transition: transform .8s cubic-bezier(1, 0, 0.25, 1.5);
		transform: scale(0);
	}

	.login-fade-enter-to {
		transform: scale(1);
	}

	.login-fade-leave-active {
		transition: transform .6s ease;
	}

	.login-fade-leave-to {
		transform: rotate(45deg) scale(0);
	}

	.fade-enter-ative {
		opacity: 0;
		transition: opacity .4s ease;
	}

	.fade-enter-to {
		opacity: 1;
	}
</style>

<script>
	import background from "../img/background.jpg";
	import Gokin from "../js/gokin-api"

	import KnBox from "../components/KnBox.vue";
	import KnLoginDialog from "../layouts/KnLoginDialog.vue";
	import KnUserDialog from "../layouts/KnUserDialog.vue";
	import KnMain from "../layouts/KnMain.vue";

	export default {
		components: {
			KnBox,
			KnLoginDialog,
			KnUserDialog,
			KnMain
		},

		computed: {
			loggedIn() {
				return this.$store.state.loggedIn;
			},

			context() {
				return this.loggedIn ? 'kn-user-dialog' : 'kn-login-dialog';
			},

			gameName() {
				return location.href.match(/^kakin:\/\/kakin\/([a-z0-9-]+)/)[1];
			},

			environment() {
				return this.$store.state.environment;
			},

			brand() {
				return this.environment ? this.environment.getBrand() : null;
			},

			backgroundStyle() {
				return {
					backgroundImage: `url("${this.environment ? this.environment.getBackground() : background}")`
				};
			},

			highScore() {
				return this.$store.state.highScore;
			}
		}
	};
</script>
