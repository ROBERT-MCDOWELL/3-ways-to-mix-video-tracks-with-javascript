const CONFIG = Object.freeze({
	WIDTH: 1920,
	HEIGHT: 1080
});

let offscreen, ctx;

onmessage = function (e) {
	const { action, user, screen } = e.data;
	
	switch(action) {
		case 'init':
			offscreen = new OffscreenCanvas(CONFIG.WIDTH, CONFIG.HEIGHT);
			ctx = offscreen.getContext("2d");
			break;
		case 'render':
			ctx.drawImage(screen, 0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
			ctx.drawImage(user, CONFIG.WIDTH/2, CONFIG.HEIGHT/2, CONFIG.WIDTH/2, CONFIG.HEIGHT/2);
			
			const imageBitmap = offscreen.transferToImageBitmap();
			postMessage({imageBitmap: imageBitmap}, [imageBitmap]);
			
			break;
		default:
			break;
	}
}
