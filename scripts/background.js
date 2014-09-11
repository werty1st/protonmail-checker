// Open a new tab or activate the first tab when clicked on the extension icon
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query(
    {url: 'https://mail.protonmail.ch/*'},
    function(tab_list) {
      if (tab_list.length == 0) {
        chrome.tabs.create({url: 'https://mail.protonmail.ch/inbox'});
      } else {
        chrome.tabs.update(tab_list[0].id, {active: true});
      }
    }
  );
});


// Change the extension icon and badge when the content script sent a message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    setIcon(request.color, request.count, request.tooltip);
});


// Change the extension icon and badge when there is no ProtonMail tab open
function checkTabs() {
  chrome.tabs.query(
    {url: 'https://mail.protonmail.ch/*'},
    function(array) {
      if (array.length == 0) {
        setIcon('gray', 'X', 'No ProtonMail tab found');
      }
    }
  );

  setTimeout(checkTabs, 2000);
}

checkTabs();


// Set the extension icon and badge
function setIcon(color, count, tooltip) {
  var icon = '';
  var badge_color = '#FF0000';

  if (color == 'gray') {
    icon = 'g';
    badge_color = '#D0D0D0';
  }

  chrome.browserAction.setIcon({path: 'icons/icon-48' + icon + '.png'});
  chrome.browserAction.setTitle({title: tooltip});
  chrome.browserAction.setBadgeText({text: count});
  chrome.browserAction.setBadgeBackgroundColor({color: badge_color});
}
