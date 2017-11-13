<template>
	<kn-box class="user" column>
		<kn-gravatar :hash="emailHash" :size="106" dark></kn-gravatar>

		<h3 class="user-name" :title="username">
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
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
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

			credit() {
				return this.$store.state.credit;
			},

			eventCredit() {
				return this.$store.state.eventCredit;
			}
		}
	};
</script>
