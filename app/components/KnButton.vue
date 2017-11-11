<template>
	<button class="kn-button" @click="handleEvent">
		<slot></slot>
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
	}
</style>
