<template>
	<kn-main>
		<kn-box class="main-box">
			<div class="background-tint"></div>

			<transition name="login-fade" mode="out-in">
				<component :is="context"></component>
			</transition>
		</kn-box>
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
</style>

<script>
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
			}
		}
	};
</script>
