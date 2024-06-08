chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractM3U8Links') {
      var result = {};
  
      // Extract embed_url and Title from the __NEXT_DATA__ script tag
      console.log(document.body);
      console.log(document.getElementById('__NEXT_DATA__'));
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
      }else{
        const scripts = document.querySelectorAll('script');
        console.log(scripts);
        scripts.forEach(script => {
            const content = script.textContent;
            if (content.includes('self.__next_f.push')) {
                const startIndex = content.indexOf('[');
                const endIndex = content.lastIndexOf(']');
                const extractedContent = content.slice(startIndex, endIndex + 1);
                //console.log('Content added to private variable: ', extractedContent);
                if (extractedContent.includes('.m3u8')) {
                  var inputString = extractedContent;
                  // Regular expressions to extract title and links
                  // var titleRegex = /\\"title\\":\\"([^\\"]+)\\"/;
                  var titleRegex = /\\"title\\":\\"([^\\"]+\s*\|\s*[^\\"]+)\\"/;
                  var linkRegex = /\\"(720|1080|360)\\":\\"([^\\"]+)\\"/g;

                  // Extract title
                  var titleMatch = titleRegex.exec(inputString);
                  var title = titleMatch ? titleMatch[1] : null;

                  // Extract links
                  var linkMatch;
                  var links = {};
                  while ((linkMatch = linkRegex.exec(inputString)) !== null) {
                    links[linkMatch[1]] = linkMatch[2];
                  }

                  // Prioritize links
                  var selectedLink = links['1080'] || links['720'] || links['360'];

                  // Output the selected link and title
                  console.log("Title:", title);
                  console.log("Selected Link:", selectedLink);     
                  result[title] = selectedLink;     
                }
            }
        });

      }
  
      sendResponse({ result: result });
    }
  });
  