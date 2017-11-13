<template>
	<kn-box class="user" :class="{'logged-in': loggedIn}">
		<kn-gravatar :hash="emailHash" :size="44" v-if="loggedIn"></kn-gravatar>
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
		align-items: center;

		&.logged-in {
			padding: 10px;
			width: 200px;
		}

		& span {
			line-height: 44px;
			color: #fff;
			padding-left: 15px;
			font-size: 1rem;
			font-family: var(--font);
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>

<script>
	import KnBox from "../components/KnBox.vue";
	import KnGravatar from "../components/KnGravatar.vue";

	export default {
		components: {
			KnBox,
			KnGravatar
		},

		computed: {
			username() {
				return this.$store.state.username;
			},

			emailHash() {
				return this.$store.state.emailHash;
			},

			loggedIn() {
				return this.$store.state.loggedIn;
			}
		}
	};
</script>
