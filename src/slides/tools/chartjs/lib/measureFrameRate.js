export function measureFrameRate(selector) {
    document.addEventListener('DOMContentLoaded', () => {
        const outputElement = document.querySelector(selector)
        if (!outputElement) return
        let frameCount = 0;
        let startTime;
        let lastTime;

        function loop(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }

            if (!lastTime) {
                lastTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const delta = timestamp - lastTime;

            frameCount++;

            // Update frame rate every second
            if (elapsed >= 1000) {
                const fps = frameCount / (elapsed / 1000);
                outputElement.value = `Frame Rate: ${fps.toFixed(2)} FPS`

                // Reset values for the next second
                frameCount = 0;
                startTime = timestamp;
            }

            // Request the next frame
            requestAnimationFrame(loop);

            // Update lastTime for the next frame
            lastTime = timestamp;
        }

        // Start the loop
        requestAnimationFrame(loop);
    })
}
