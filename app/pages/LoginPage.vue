<template>
	<kn-main>
		<kn-box class="main-box">
			<kn-box class="login-box" column>
				<kn-box class="login-jumbotron">Welcome!</kn-box>
				<kn-box class="in-box" column>
					<kn-textbox text="학번"></kn-textbox>
					<kn-textbox text="비밀번호" password></kn-textbox>
				</kn-box>
				<kn-button class="button">
					<kn-icon icon="ios-send-outline"></kn-icon>
				</kn-button>
			</kn-box>
		</kn-box>
	</kn-main>
</template>

<style scoped>
	@import "theme";

	.main-box {
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.login-box {
		background: var(--white-darken-1);
		width: 40vmin;
		height: 40vmin;
	}

	.in-box {
		padding: 5px 10px;
		background: var(--white-darken-1);
	}

	.login-jumbotron {
		background: var(--blue);
		font-weight: 100;
		font-size: 2rem;
		padding: 10px 30px;
		color: var(--white);
		align-items: flex-end;
		height: 10vmin;
	}

	.button {
		flex: 1;
		font-size: 2rem !important;
		color: var(--white);
		background: var(--blue) !important;
		margin: 15px;
		margin-top: 5px;
	}
</style>

<script>
	import KnBox from "../components/KnBox.vue";
	import KnButton from "../components/KnButton.vue";
	import KnIcon from "../components/KnIcon.vue";
	import KnMain from "../components/KnMain.vue";
	import KnTextbox from "../components/KnTextbox.vue";

	export default {
		components: {
			KnBox,
			KnButton,
			KnIcon,
			KnMain,
			KnTextbox
		}
	};
</script>
