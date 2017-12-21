<template>
	<div id="app">
		<transition name="slide-fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
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
		background: transparent;
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
	export default {};
</script>
