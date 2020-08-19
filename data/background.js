// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.storage.local.set({ "KahootHeToggle": true });

let customScript = function(tab) {
  chrome.tabs.executeScript({
    file: '/custom.js'
  }); 
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {

    chrome.storage.local.get(["KahootHeToggle"], function (result) {

      if (result.KahootHeToggle) {
      chrome.browserAction.setIcon({path: 'iconoff.png'});
      chrome.storage.local.set({ "KahootHeToggle": false });
      customScript();
    } else {
      chrome.browserAction.setIcon({path: 'iconon.png'});
      customScript();
      chrome.storage.local.set({ "KahootHeToggle": true });
    }
  });
});


