document.getElementById('uploadImage').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        chrome.storage.local.set({ userImage: reader.result }, function() {
            console.log('User image uploaded and stored.');
        });
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('selectOutfit').addEventListener('click', function() {
    console.log('Select Outfit button clicked.');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: selectOutfit
        }, (result) => {
            if (chrome.runtime.lastError) {
                console.error('Script execution failed:', chrome.runtime.lastError);
            } else {
                console.log('Script executed successfully.');
            }
        });
    });
});

function selectOutfit() {
    document.body.addEventListener('click', function(event) {
        
        if (event.target.tagName === 'IMG') {
            const outfitImage = event.target.src;
            chrome.storage.local.set({ outfitImage: outfitImage }, function() {
                chrome.runtime.sendMessage({
                    type: 'outfitSelected',
                    outfitImage: outfitImage
                });
            });
        }
    });
}
