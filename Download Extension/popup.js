document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extractM3U8Links' }, function(response) {
        displayLinks(response.result);
      });
    });
  
    function displayLinks(result) {
      var linksContainer = document.getElementById('m3u8Links');
      linksContainer.innerHTML = ''; // Clear previous content
  
      if (Object.keys(result).length === 0) {
        linksContainer.textContent = 'No M3U8 links found in the API response on this page.';
      } else {
        for (var title in result) {
          var linkElement = document.createElement('p');
          linkElement.textContent = ' Title : ' + title + ' \n \n \n || URI : ' + result[title] + '\n';
          
          // Add a button to trigger the Python script
          var executeButton = document.createElement('button');
          executeButton.textContent = 'download the video';
          executeButton.addEventListener('click', function() {
            executePythonScript(title, result[title]);
          });
  
          // Append both link and button to the container
          linksContainer.appendChild(linkElement);
          linksContainer.appendChild(executeButton);
        }
      }
    }
    function executePythonScript(title, url) {
        // Send a message to the background script to execute the Python script
        chrome.runtime.sendMessage({ action: 'executePythonScript', title: title, url: url });
      }

  });
  
  // Trigger extraction when the popup is opened
  chrome.runtime.sendMessage({ action: 'extractM3U8Links' });