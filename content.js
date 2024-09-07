function selectOutfit() {
    console.log('Outfit image selected:')
    document.body.addEventListener('click', function(event) {
        
        if (event.target.tagName === 'IMG') {
            const outfitImage = event.target.src;
            chrome.storage.local.set({ outfitImage: outfitImage }, function() {
                console.log('Outfit image selected:', outfitImage);
                chrome.runtime.sendMessage({
                    type: 'outfitSelected',
                    outfitImage: outfitImage
                });
            });
        }
    });
}
