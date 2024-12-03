const options = document.querySelectorAll('.menu-option');
const totalOptions = options.length;
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const carousel = document.querySelector('.carousel');

function updateCarousel(rotation) {
    options.forEach((option, i) => {
        const angle = (i / totalOptions) * Math.PI * 2 + rotation; // Spread out in a circle
        const x = Math.cos(angle) * 600; // X position
        const y = Math.sin(angle) * 50; // Y position (controls depth)

        // Scale based on Y position
        const scale = 1.3 + (y / 100); // Larger when closer to the center
        const opacity = 1 + (y / 200); // Fades as it moves back

        // Apply transformations
        option.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        option.style.opacity = opacity;
    });
}

const anglePerPanel = (2 * Math.PI) / totalOptions;
let rotation = 0;

document.addEventListener('keydown', (e) => {
    if(e.repeat) { return } // Avoid multiple triggers for the same key
    if (e.key === 'ArrowLeft') rotation -= anglePerPanel; // Rotate left
    if (e.key === 'ArrowRight') rotation += anglePerPanel; // Rotate right
    updateCarousel(rotation); // Update the carousel based on the new rotation
});
updateCarousel(0); // Hide the loading screen
carousel.style.display = 'none';

// Simulate loading progress
let progress = 0;
const progressBarLeft = document.createElement('div');
progressBarLeft.id = 'progress-left';
progressBarLeft.classList.add('progress-bar');
document.querySelector('.loading-bar').appendChild(progressBarLeft);

const progressBarRight = document.createElement('div');
progressBarRight.id = 'progress-right';
progressBarRight.classList.add('progress-bar');
document.querySelector('.loading-bar').appendChild(progressBarRight);

const loadingInterval = setInterval(() => {
    progress += 8;
    progressBarLeft.style.width = `${progress / 2}%`;
    progressBarRight.style.width = `${progress / 2}%`;

    if (progress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Hide loading screen
            carousel.style.display = 'flex'; // Show carousel
        }, 500); // Optional delay for smooth transition
    }
}, 50); // Update progress every 50ms
