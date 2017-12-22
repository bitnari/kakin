<template>
	<form @submit="handleLogin($event)" class="submit-box" key="login">
		<kn-box class="login-box" column>
			<kn-box class="login-jumbotron" column>
				Welcome!
				<span class="login-desc">새 계정 생성은 카운터에서 해주세요!</span>
			</kn-box>
			<kn-box class="in-box" column>
				<kn-box class="id-box">
					<kn-textbox ref="grade" text="학년" type="number" required></kn-textbox>
					<kn-textbox ref="class" text="반" type="number" required></kn-textbox>
					<kn-textbox ref="number" text="번호" type="number" required></kn-textbox>
				</kn-box>
				<kn-textbox ref="password" text="비밀번호" type="password" required></kn-textbox>
			</kn-box>
			<kn-box>
				<kn-button class="button">
					<kn-icon icon="ios-send-outline"></kn-icon>
				</kn-button>

				<kn-button class="button demo-button" type="button" :click="demo">
					Demo
				</kn-button>
			</kn-box>
		</kn-box>
	</form>
</template>

<style scoped>
	@import "theme";

	.submit-box {
		position: relative;
	}

	.login-box {
		background: var(--white-darken-1);
		width: 400px;
		height: 400px;
	}

	.in-box {
		padding: 5px 10px;
		background: var(--white-darken-1);
	}

	.id-box * {
		width: 0;
		flex: 1;
	}

	.login-jumbotron {
		background: var(--blue);
		font-weight: 100;
		font-family: var(--font);
		font-size: 2.4rem;
		padding: 10px 30px;
		color: var(--white);
		justify-content: flex-end;
		height: 130px;
	}

	.login-desc {
		font-size: .9rem;
		opacity: .8;
	}

	.button {
		flex: 1;
		font-size: 2rem !important;
		color: var(--white);
		background: var(--blue) !important;
		margin: 15px;
		margin-top: 5px;
	}

	.demo-button {
		font-size: 1.3rem !important;
	}
</style>

<script>
	import Gokin from "../js/gokin-api";
	import KnBox from "../components/KnBox.vue";
	import KnButton from "../components/KnButton.vue";
	import KnIcon from "../components/KnIcon.vue";
	import KnTextbox from "../components/KnTextbox.vue";

	import swal from "sweetalert2";

	export default {
		components: {
			KnBox,
			KnButton,
			KnIcon,
			KnTextbox
		},

		methods: {
			handleLogin(ev) {
				Gokin.login(
					this.$refs.grade.value,
					this.$refs['class'].value,
					this.$refs.number.value,
					this.$refs.password.value
				).then((user) => {
					this.$store.commit('login', {
						username: user.id,
						credit: user.credit,
						eventCredit: user.eventCredit,
						user
					});

					setTimeout(() => window.environment.play(user), 5000);

				}).catch((err) => {
					if(!err instanceof Gokin.StatusError) {
						swal("Oops!", "에러가 발생했습니다. T_T<br>카운터에 문의해주세요.", "error");
					} else{
						switch(err.status) {
							case 2:
								swal("아이디가 잘못되었습니다.", "학년 반 번호를 다시 확인해주세요.", "warning");
								break;

							case 4:
								swal("비밀번호가 잘못되었습니다.", "비밀번호를 다시 한 번 확인해주세요.", "warning");
								break;

							case 10:
								swal("계정을 만들어주세요!",
									"현재 학번에 해당하는 계정이 없습니다.<br>카운터에서 계정을 만들어주세요.", "warning");
								break;

							default:
								swal("Oops!", "에러가 발생했습니다. T_T<br>카운터에 문의해주세요.", "error");
						}
					}
				});

				ev.preventDefault();
			},

			demo() {
				window.environment.demonstrate();
			}
		}
	}
</script>
