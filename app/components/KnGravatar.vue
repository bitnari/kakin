<template>
	<div class="user-image-wrapper" :style="{width: `${sideScale}px`, height: `${sideScale}px`}">
		<img class="user-image" :src="image" :style="{width: `${size}px`}">
		<img class="user-image" :src="url" :style="{width: `${size}px`}">
	</div>
</template>

<style scoped>
	.user-image-wrapper {
		width: 31px;
		height: 31px;
		transform: rotate(45deg);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		& .user-image {
			transform: rotate(-45deg);
			width: 44px;
			position: absolute;
		}
	}
</style>

<script>
	import darkImage from "../img/user-dark.svg";
	import lightImage from "../img/user.svg";

	export default {
		props: {
			hash: {
				type: String,
				required: true
			},

			size: {
				type: Number,
				required: true
			},

			dark: {
				type: Boolean
			}
		},

		computed: {
			sideScale() {
				return this.size / Math.sqrt(2);
			},

			url() {
				return `https://www.gravatar.com/avatar/${this.hash}?s=${this.size}&d=blank`;
			},

			image() {
				return this.dark ? darkImage : lightImage;
			}
		}
	}
</script>
