/**
 * Configuration constants for video dimensions
 */
export const CONFIG = Object.freeze({
	WIDTH: 1920,
	HEIGHT: 1080
});

/**
 * Media constraints for getUserMedia and getDisplayMedia
 */
const MEDIA_CONSTRAINTS = {
	video: {
		width: CONFIG.WIDTH,
		height: CONFIG.HEIGHT
	},
	audio: false
};

/**
 * Captures video from the user's camera
 * @returns {Promise<MediaStream>} The media stream from the camera
 */
export async function getUserStream() {
	return await navigator.mediaDevices.getUserMedia(MEDIA_CONSTRAINTS);
}

/**
 * Captures video from the user's screen
 * @returns {Promise<MediaStream>} The media stream from the screen
 */
export async function getScreenStream() {
	return await navigator.mediaDevices.getDisplayMedia(MEDIA_CONSTRAINTS);
}

/**
 * Creates an ImageCapture instance from a media stream
 * @param {MediaStream} stream - The media stream to capture from
 * @returns {ImageCapture} The ImageCapture instance
 */
export function createImageCapture(stream) {
	return new ImageCapture(stream.getVideoTracks()[0]);
}