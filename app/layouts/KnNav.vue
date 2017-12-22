<template>
	<nav id="navigation">
		<kn-box class="naviagtion-brand">
			<h1>
				<kn-icon icon="ios-analytics"></kn-icon>
				{{brand}}
			</h1>
		</kn-box>

		<kn-box class="navigation-links">
			<slot></slot>
		</kn-box>
	</nav>
</template>

<style scoped>
	@import "theme";

	nav {
		display: flex;
		padding: 0 10rem;
		justify-content: space-between;
		height: var(--nav-height);
		background: var(--nav-background);

		& h1, & i {
			color: var(--nav-color);
			font-family: var(--font);
		}
	}
</style>

<script>
	import KnBox from "../components/KnBox.vue";
	import KnIcon from "../components/KnIcon.vue";

	export default {
		components: {
			KnBox,
			KnIcon
		},

		props: {
			brand: {
				type: String,
				default: "Kakin"
			}
		}
	};
</script>
