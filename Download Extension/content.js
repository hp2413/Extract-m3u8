chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractM3U8Links') {
      var result = {};
  
      // Extract embed_url and Title from the __NEXT_DATA__ script tag
      console.log(document.body);
      console.log(document.getElementById('__NEXT_DATA__'));
      var nextDataScript = document.getElementById('__NEXT_DATA__');
      if (nextDataScript) {
        try {
          var jsonData = JSON.parse(nextDataScript.textContent);
          console.log(jsonData);
          console.log(jsonData.props.pageProps.video.Title);
          console.log(jsonData.props.pageProps.video.file_link);
          if (jsonData && jsonData.props && jsonData.props.pageProps && jsonData.props.pageProps.video) {
            m3u8Links = jsonData.props.pageProps.video.file_link;
            result[jsonData.props.pageProps.video.Title] = jsonData.props.pageProps.video.file_link;
          }
        } catch (error) {
          console.error('Error parsing __NEXT_DATA__ script tag:', error);
        }
      }
  
      sendResponse({ result: result });
    }
  });
  