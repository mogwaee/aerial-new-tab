var videosUrl = "http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json"

var locationTab;
var locationOverlay;
var showControls;

var init = function() {

  // Get settings from chrome storage
  chrome.storage.local.get({
    locationTabChoice : true,
    locationOverlayChoice : true,
    showControlsChoice : false
  }, function(items) {
    locationTab = items.locationTabChoice;
    locationOverlay = items.locationOverlayChoice;
    showControls = items.showControlsChoice;
  });

  $.ajax({
    dataType: "json",
    url: videosUrl,
  }).done(function(videoCategories){
    var randomVideoCategory = randomFromArray(videoCategories);
    var randomVideo = randomFromArray(randomVideoCategory.assets);
    var randomVideoUrl = randomVideo.url;
    var randomVideoLocation = randomVideo.accessibilityLabel;

    var video = document.getElementById('video-container');  
    // Check if the video already has a source child element.    
    var n = video.childElementCount;

    // If it it has a source, modify it to play new video.
    if (n>0) {
      video.pause();
      var source = document.getElementById('video-source');
      source.setAttribute('src', randomVideoUrl);
      video.load();
    // It is has no source, create one.
    } else {
      var source = document.createElement('source');
      source.setAttribute('id', 'video-source');
      source.setAttribute('src', randomVideoUrl);
      video.appendChild(source);
    }

    // Reload once the video has ended
    video.onended = function(e) {
      //console.log("Video ended");
      init();
    }


    // Show or hide Location overlay
    var location = document.getElementById('location');
    location.innerHTML = randomVideoLocation;
    if (locationOverlay){
      location.style.display = "show";  
    } else {
      location.style.display = "none";
    }
    
    // Show or hide Location in Tab Title
    var tabTitleLocation = document.getElementById('tabTitle');
    if (locationTab){
      tabTitleLocation.innerHTML = "New Tab - " + randomVideoLocation;
    } else {
      tabTitleLocation.innerHTML = "New Tab";
    }
    
    // Show video controls
    if (showControls){
      video.setAttribute('controls',1);
      video.style.zIndex = 100;
      location.style.top = "4px";
    }

  });
}

init();

var randomFromArray = function(array) {
  return array[Math.floor(Math.random()*array.length)]
}