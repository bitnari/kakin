<template>
	<kn-box class="user" column>
		<div class="user-image-wrapper">
			<img class="user-image" src="https://www.gravatar.com/avatar/099e07441a328e91f409964066dd37e1?s=250">
		</div>

		<h3 class="user-name">
			{{username}}
		</h3>

		<kn-box class="user-information">
			<kn-box class="user-credit" column>
				<img src="../img/credit.svg" class="credit-icon">
				<span class="credit-desc">코인</span>
				<span class="credit-value">
					{{credit}}
				</span>
			</kn-box>

			<kn-box class="user-credit" column>
				<img src="../img/credit-plus.svg" class="credit-icon">
				<span class="credit-desc">이벤트 코인</span>
				<span class="credit-value">
					{{eventCredit}}
				</span>
			</kn-box>
		</kn-box>
	</kn-box>
</template>

<style scoped>
	@import "theme";

	.user {
		align-items: center;

		& .user-name {
			color: var(--grey-darken-1);
			font-family: var(--font);
			text-align: center;
			font-size: 2rem;
			font-weight: 100;
			margin-top: 20px;
		}

		& .user-image-wrapper {
			width: 75px;
			height: 75px;
			transform: rotate(45deg);
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			& .user-image {
				transform: rotate(-45deg);
				width: 106px;
			}
		}

		& .user-information {
		    width: 50%;
			justify-content: space-between;

			& .user-credit {
				align-items: center;

				& .credit-icon {
					width: 75px;
				}

				& .credit-desc {
					font-family: var(--font);
					font-size: .8rem;
				}

				& .credit-value {
					font-family: var(--font);
					font-weight: 100;
					font-size: 2.5rem;
					margin-top: 10px;
				}
			}
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

			credit() {
				return this.$store.state.credit;
			},

			eventCredit() {
				return this.$store.state.eventCredit;
			}
		}
	};
</script>
