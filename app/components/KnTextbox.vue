<template>
	<input class="kn-textbox" :placeholder="text" :type="type" :required="required">
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: ""
			},

			type: {
				type: String,
				default: "text"
			},

			required: {
				type: Boolean
			}
		},

		computed: {
			value() {
				return this.$el.value;
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
