
var checkedTab = document.getElementById('checkbox-Tab');
var checkedOverlay = document.getElementById('checkbox-Overlay');
var checkedControls = document.getElementById('checkbox-Controls');

// Check to see if there were options already set by the user
chrome.storage.local.get({
    locationTabChoice : true,
    locationOverlayChoice : true,
    showControlsChoice : false
}, function(items) {
    locationTab = items.locationTabChoice;
    locationOverlay = items.locationOverlayChoice;
    showControls = items.showControlsChoice;
    
    // Depending on what was stored, set the checkboxes.
    if (locationTab){
        checkedTab.checked = true;
    } else {
        checkedTab.checked = false;
    }
    if (locationOverlay){
        checkedOverlay.checked = true;
    } else {
        checkedOverlay.checked = false;
    }
    if (showControls){
        checkedControls.checked = true;
    } else {
        checkedControls.checked = false;
    }
});


// Save all options when user clicks on any checkbox
checkedTab.onclick = function() {saveOptions()};
checkedOverlay.onclick = function() {saveOptions()};
checkedControls.onclick = function() {saveOptions()};

var saveOptions = function() {
    
    chrome.storage.local.set({
        locationTabChoice: checkedTab.checked,
        locationOverlayChoice: checkedOverlay.checked,
        showControlsChoice: checkedControls.checked
    }, function() {
        console.log('locationTabChoice: ' + checkedTab.checked);
        console.log('locationOverlayChoice: ' + checkedOverlay.checked);
        console.log('showControlsChoice: ' + checkedControls.checked);
    })

}
