<template>
	<kn-box class="user" :class="{'logged-in': loggedIn}">
		<img src="../img/user.svg"></img>
		<span>{{username}}</span>
	</kn-box>
</template>

<style scoped>
	@import "theme";

	.user {
		padding: 10px 0;
		width: 0;
		overflow: hidden;
		justify-content: flex-end;
		transition: all .5s ease;

		&.logged-in {
			padding: 10px;
			width: 200px;
		}

		& img {
			width: 44px;
			height: 44px;
		}

		& span {
			line-height: 44px;
			width: 56px;
			color: #fff;
			padding-left: 10px;
			font-size: 1rem;
			font-family: var(--font);
		}
	}
</style>

<script>
	import KnBox from "../components/KnBox.vue";

	export default {
		components: {
			KnBox
		},

		computed: {
			username() {
				return this.$store.state.username;
			},

			loggedIn() {
				return this.$store.state.loggedIn;
			}
		}
	};
</script>
