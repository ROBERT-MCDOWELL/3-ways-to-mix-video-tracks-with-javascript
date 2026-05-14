const CONFIG = Object.freeze({
	WIDTH: 1920,
	HEIGHT: 1080
});

let offscreen, ctx;

onmessage = function (e) {
	const { cameraReadable, screenReadable, mixedWritable } = e.data;
	mix(cameraReadable, screenReadable, mixedWritable);
}

function mix(cameraReadable, screenReadable, mixedWritable) {
	const screenReader = screenReadable.getReader();
	let screenFrame;
	
	const transformer = new TransformStream({
		async transform(cameraFrame, controller) {
			screenReader.read().then(frame => {
				if (screenFrame) {
					screenFrame.close();
				}
				screenFrame = frame.value;
			});
			
			if (screenFrame) {
				ctx.drawImage(screenFrame, 0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
			}
			ctx.drawImage(cameraFrame, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2);

			const mixedFrame = new VideoFrame(offscreen, { timestamp: cameraFrame.timestamp });
			cameraFrame.close();
			controller.enqueue(mixedFrame);
		}
	});

	cameraReadable.pipeThrough(transformer).pipeTo(mixedWritable);
}
