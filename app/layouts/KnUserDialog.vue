<template>
	<div class="user-box">
		<div class="backdrop"></div>
		<kn-user class="user-dialog"></kn-user>
		<div class="sk-folding-cube">
			<div class="sk-cube1 sk-cube"></div>
			<div class="sk-cube2 sk-cube"></div>
			<div class="sk-cube4 sk-cube"></div>
			<div class="sk-cube3 sk-cube"></div>
		</div>
	</div>
</template>

<style scoped>
	@import "theme";
	@import "spinkit/css/spinkit.css";

	.user-box {
		width: 400px;
		height: 400px;
		position: relative;

		&.logged-in {
			display: block;
			transform: scale(1);
		}

		& .backdrop {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			transform: rotate(45deg);
			background: var(--white);
		}

		& .user-dialog {
			position: relative;
		}
	}
</style>

<script>
	import KnUser from "./KnUser.vue";

	export default {
		components: {
			KnUser
		}
	};
</script>
