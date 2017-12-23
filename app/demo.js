import "./css/demo.css";

let leftTime = 20;
const h1 = document.querySelector('h1');

setInterval(() => {
	leftTime = Math.max(0, leftTime - 1);
	h1.innerHTML = `남은 시간: ${leftTime}`;
}, 1000);
