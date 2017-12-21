<template>
	<kn-main>
		<kn-box class="main-box">
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
						<span class="rank">#{{index + 1}}</span>
						<span class="score">{{score.score}}</span>
						<span class="name">{{score.name}}</span>
					</kn-box>
				</template>
			</kn-box>
		</transition>
	</kn-main>
</template>

<style scoped>
	@import "theme";

	.main-box {
		align-items: center;
		justify-content: center;
		flex: 1;
		background: var(--background);
		position: relative;
	}

	.score-box {
		position: fixed;
		bottom: 30px;
		right: 30px;
		padding: 10px;
		/* background: rgba(255, 255, 255, .5); */
		font-family: var(--font);
	}

	.

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

		asyncComputed: {
			async highScore() {
				return await Gokin.highScore(this.gameName);
			}
		},

		computed: {
			loggedIn() {
				return this.$store.state.loggedIn;
			},

			context() {
				return this.loggedIn ? 'kn-user-dialog' : 'kn-login-dialog';
			},

			gameName() {
				return this.$route.params.game;
			}
		}
	};
</script>
