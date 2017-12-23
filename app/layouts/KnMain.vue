<template>
	<main id="main">
		<kn-nav :brand="brand">
			<kn-nav-user></kn-nav-user>
		</kn-nav>
		<slot></slot>
	</main>
</template>

<style scoped>
	@import "theme";

	#main {
		background: var(--background-color);
		display: flex;
		min-height: 100vh;
		min-width: 100vw;
		flex-direction: column;
	}
</style>


<script>
	import KnNav from "./KnNav.vue";
	import KnNavUser from "./KnNavUser.vue";

	export default {
		components: {
			KnNav,
			KnNavUser
		},

		props: {
			brand: {
				type: String,
				default: "Kakin"
			}
		}
	};
</script>
