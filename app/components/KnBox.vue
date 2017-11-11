<template>
	<div class="kn-box" :style="{flexDirection: direction}">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			column: {
				type: Boolean
			}
		},

		computed: {
			direction() {
				return this.column ? "column" : "row";
			}
		}
	};
</script>

<style>
	@import "theme";

	.kn-box {
		display: flex;
	}
</style>
