<template>
	<input type="text" class="kn-textbox" :placeholder="text" :type="type">
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ""
			},

			password: {
				type: Boolean
			}
		},

		computed: {
			type() {
				return this.password ? "password" : "text";
			}
		}
	};
</script>

<style>
	@import "theme";

	.kn-textbox {
		background: var(--textbox-background);
		font-family: var(--font);
		display: flex;
		border: none;
		padding: 20px;
		margin: 10px 5px;
		outline: none;

		&[type="password"] {
			font-family: sans-serif;
		}
	}
</style>
