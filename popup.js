'use strict';

let activate = document.getElementById('activate')

activate.onchange = function(element) {
	if (activate.checked) {
	  	document.getElementById('activate_label').textContent = 'Deactivate'
		chrome.tabs.executeScript(
	      	null,
	      	{file: 'linkedOn.js'}
	  	)
	} else {
	  	document.getElementById('activate_label').textContent = 'Activate'
		chrome.tabs.executeScript(
	      	null,
	      	{file: 'linkedOff.js'}
	  	)
	}
}
