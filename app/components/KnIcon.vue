<template>
	<i :class="iconName" class="icon"></i>
</template>

<style scoped>
	@import "ionicons/dist/css/ionicons.css";
</style>

<script>
	export default {
		props: {
			icon: {
				type: String,
				required: true
			}
		},

		computed: {
			iconName() {
				return `ion-${this.icon}`;
			}
		}
	};
</script>
