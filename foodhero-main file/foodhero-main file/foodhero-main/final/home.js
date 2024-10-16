

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('donate').addEventListener('click', async function() {
        window.location.href = `donatefood.html`;
    });

    document.getElementById('recieve').addEventListener('click', async function() {
        window.location.href = `recieve_food.html` });

    // Dark mode toggle
    const darkModeButton = document.getElementById('darkmode');
    darkModeButton.addEventListener('click', () => {
        console.log('Dark mode button clicked'); // Debugging
        document.body.classList.toggle('dark-mode');
    });
});
