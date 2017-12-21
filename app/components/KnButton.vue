<template>
	<button class="kn-button" @click="handleClick" :type="type">
		<div class="gradient-backdrop"></div>
		<div class="button-content">
			<slot></slot>
		</div>
	</button>
</template>

<style scoped>
	@import "theme";

	.kn-button {
		background: var(--button-background);
		border: none;
		font-family: var(--font);
		font-size: 1rem;
		padding: 10px 20px;
		position: relative;
		outline: none;
		cursor: pointer;
	}

	.gradient-backdrop {
		opacity: 0;
		background: linear-gradient(to right, #36d1dc, #5b86e5);
		transition: opacity .4s ease;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.kn-button:hover .gradient-backdrop {
		opacity: .5;
	}

	.kn-button:active .gradient-backdrop {
		opacity: 1;
	}

	.button-content {
		position: relative;
	}
</style>

<script>
	export default {
		props: {
			click: {
				type: Function,
				default() {}
			},

			type: {
				type: String,
				default: "submit"
			}
		},

		methods: {
			handleClick() {
				if(this.click) this.click();
			}
		}
	}
</script>
