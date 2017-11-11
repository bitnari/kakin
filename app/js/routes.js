import LoginPage from "../pages/LoginPage.vue";
import UserPage from "../pages/UserPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

export default [
	{path: '/', component: LoginPage},
	{path: '/user', component: UserPage},
	{path: '*', component: NotFoundPage}
];
