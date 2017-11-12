<template>
	<div id="app">
		<transition name="slide-fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<style>
	body, html {
		margin: 0;
		padding: 0;
	}

	::selection {
		background: transparent;
	}
</style>

<script>
	export default {};
</script>
