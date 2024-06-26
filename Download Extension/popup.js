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
         
          // linkElement.textContent = ' Title : ' + title + ' \n \n \n || URI : ' + result[title] + '\n';
          const script = `echo '{"title": "${title}", "url": "${result[title]}"}' | /Library/Frameworks/Python.framework/Versions/3.11/bin/python3 "/Users/harsh_1301/Work/Personal work/Extract-m3u8/Download.py"`;

          linkElement.textContent = script;

          
          // // Add a button to trigger the Python script
          // var executeButton = document.createElement('button');
          // executeButton.textContent = 'download the video';
          // executeButton.addEventListener('click', function() {
          //   executePythonScript(title, result[title]);
          // });

           // Add a button to copy the linkElement.textContent content
           var copyButton = document.createElement('button');
           copyButton.textContent = 'Copy Command';
           copyButton.addEventListener('click', function() {
               copyToClipboard(linkElement.textContent);
           });
  
          // Append both link and button to the container
          linksContainer.appendChild(linkElement);
          // linksContainer.appendChild(executeButton);
          linksContainer.appendChild(copyButton);
        }
      }
    }
    function executePythonScript(title, url) {
        // Send a message to the background script to execute the Python script
        chrome.runtime.sendMessage({ action: 'executePythonScript', title: title, url: url });
      }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            // alert('Copied to clipboard');
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }

  });
  
  // Trigger extraction when the popup is opened
  chrome.runtime.sendMessage({ action: 'extractM3U8Links' });