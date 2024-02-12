chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'executePythonScript') {
      // Execute your Python script using Native Messaging or any other method
      // You may use an external application to execute the Python script
      // Example: chrome.runtime.sendNativeMessage('your_native_app_id', { title: request.title, url: request.url });
      console.log('Executing Python script for title:', request.title, 'and URL:', request.url);
      const script = `echo '{"title": "${request.title}", "url": "${request.url}"}' | /Library/Frameworks/Python.framework/Versions/3.11/bin/python3 "/Users/harsh_1301/Work/Personal work/Download.py"`;

      exec(script, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
     });
      
    }
  });
  