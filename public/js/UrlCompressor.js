async function shortenUrl(event) {
    event.preventDefault();
    const urlInput = document.querySelector('input[name="url"]');
    const url = urlInput.value.trim();
    if (!url) return;

    try {
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.ok) {
            const shortUrl = data.result.short_link;
            // Display the shortened URL to the user
            const shortUrlInput = document.getElementById("shortUrl");
            shortUrlInput.value = shortUrl;
            document.querySelector(".short-url").style.display = "flex";
        } else {
            throw new Error('API error: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Display an error message to the user
    }
}
