const options = document.querySelectorAll('.menu-option');
const totalOptions = options.length;

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
    if(e.repeat) { return }
    if (e.key === 'ArrowLeft') rotation -= anglePerPanel;
    if (e.key === 'ArrowRight') rotation += anglePerPanel;
    updateCarousel(rotation);
});

updateCarousel(0); // Initial setup
