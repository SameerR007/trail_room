console.log('background.js file started:')
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.type)
        if (message.type === 'outfitSelected') {
        chrome.storage.local.get(['userImage'], function(result) {
            const userImage = result.userImage;
            const outfitImage = message.outfitImage;

            if (userImage) {
                fetch('http://127.0.0.1:5000/generate-outfit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userImage, outfitImage })
                })
                .then(response => response.json())
                .then(data => {
                    // Do something with the generated image (data.generatedImage)
                    chrome.storage.local.set({ generatedImage: data.generatedImage });
                })
                .catch(err => console.error('Error generating image:', err));
            } else {
                console.error('User image not found in storage.');
            }
        });
    }
});

