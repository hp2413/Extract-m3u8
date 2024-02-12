# Extract-m3u8
Extract the m3u8 file uri from 100x page. and download it through the python API

Add the extension by adding the download folder to the extension by following this step:

Load your extension in Chrome:
Open Chrome and go to chrome://extensions/.
Enable "Developer mode" in the top right corner.
Click on "Load unpacked" and select the folder containing your extension files.

to execute the Python command to download the video file pass this title and the master m3u8 URL

echo '{"title": "Week 1.1 – 10/06/23 | Recapping Pre requisites, Basics of JS", "url": "https://appx-recordings.livelearn.in/drm/ca520e78-68a0-47c4-8530-e4f0960eb462/720p/drm-hls/master-4281808.674243038.m3u8.m3u8"}' | /Library/Frameworks/Python.framework/Versions/3.11/bin/python3 "/Users/harsh_1301/Work/Personal work/Download.py"


