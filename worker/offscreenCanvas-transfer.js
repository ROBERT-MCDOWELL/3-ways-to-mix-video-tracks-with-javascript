const CONFIG = Object.freeze({
	WIDTH: 1920,
	HEIGHT: 1080
});

let ctx;

onmessage = function (e) {
	const { action, offscreen, screen, user } = e.data;
	
	switch(action) {
		case 'init':
			ctx = offscreen.getContext("2d");
			break;
		case 'render':
			ctx.drawImage(screen, 0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
			ctx.drawImage(user, CONFIG.WIDTH/2, CONFIG.HEIGHT/2, CONFIG.WIDTH/2, CONFIG.HEIGHT/2);
			break;
		default:
			break;
	}
}
