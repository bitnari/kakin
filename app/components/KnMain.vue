<template>
	<main id="main">
		<kn-nav></kn-nav>
		<slot></slot>
	</main>
</template>

<script>
	import KnNav from "./KnNav.vue";

	export default {
		components: {
			KnNav
		}
	};
</script>

<style scoped>
	@import "theme";

	#main {
		background: var(--background);
		display: flex;
		min-height: 100vh;
		min-width: 100vw;
		flex-direction: column;
	}
</style>
