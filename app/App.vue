<template>
	<div id="app">
		<transition name="slide-fade" mode="out-in">
			<keep-alive>
				<login-page></login-page>
			</keep-alive>
		</transition>
	</div>
</template>

<style>
	@import "theme";

	body, html {
		margin: 0;
		padding: 0;
	}

	::selection {
		background: rgba(0, 0, 0, .5);
	}

	.swal2-content {
		font-family: var(--font);
		font-weight: 400 !important;
	}

	.swal2-title {
		font-family: var(--font);
		font-weight: 300 !important;
	}
</style>

<script>
	import LoginPage from "./pages/LoginPage.vue";

	export default {
		components: {
			LoginPage
		}
	};
</script>
