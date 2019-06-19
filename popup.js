'use strict';

// lightmode1 start
let lightMode1 = document.getElementById('lightMode1')

lightMode1.onchange = function(element) {
	chrome.tabs.executeScript(
      	null,
      	{file: 'linkedIn.js'}
  	)
}
// lightmode1 finish



// message with reload
// function showMessage() {
// 	document.querySelector('.message').classList.add('message-visible')
// 	document.querySelector('.message__link').onclick = function() {
// 	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 	        chrome.tabs.update(tabs[0].id, {url: tabs[0].url})
// 	        document.querySelector('.message').classList.remove('message-visible')
// 	    })
// 	}
// }