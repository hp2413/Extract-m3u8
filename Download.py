import sys
import json
import requests
import subprocess
import m3u8
import os

def main():
    # Read input from Chrome extension
    input_data = json.loads(sys.stdin.readline())
    
    title = input_data.get('title')
    m3u8_url = input_data.get('url')
    title = title.replace(" ", "_")
    title = title.replace("/", "_")
    # Your Python script logic goes here
    print(f"Python script executed for title: {title}, URL: {m3u8_url}")

    # Replace "input.m3u8" with the actual M3U8 file name
    input_file = f"/Users/harsh_1301/Downloads/{title}.ts"
    # Replace "output.mp4" with the desired MP4 file name
    output_file = f"/Users/harsh_1301/Downloads/{title}.mp4"
    # m3u8_url = "https://appx-recordings.livelearn.in/drm/7f16ba77-be1e-413e-98f5-f367c808fcda/720p/drm-hls/master-2035696.8356511395.m3u8.m3u8"
    start_index = 0
    end_index = m3u8_url.rfind('/')
    m3u8_main_url = m3u8_url[start_index:end_index+1]
    # print(m3u8_main_url)
    file_read = requests.get(m3u8_url)
    m3u8_data = m3u8.loads(file_read.text)
    cnt = 0
    total = len(m3u8_data.data['segments'])
    # print(total)
    with open(input_file, 'wb') as ts_file:
        for segment in m3u8_data.data['segments']:
            video_url = m3u8_main_url+segment['uri']
            #print(video_url)
            print(cnt, " of ", total)
            cnt = cnt + 1
            video_read = requests.get(video_url)
            ts_file.write(video_read.content)
    proc = subprocess.run(['ffmpeg', '-i', input_file, output_file])
    # Wait for the process to complete
    # proc.wait()
    if proc.returncode == 0:
        print("Download process completed successfully")
        if os.path.exists(input_file) and os.path.exists(output_file):
            os.remove(input_file)
            print(f"{input_file} has been removed successfully")
        else:
            print(f"{input_file} or {output_file} does not exist")
    else:
        print("Download failed with return code", proc.returncode)
    

if __name__ == "__main__":
    main()


# import requests
# import subprocess
# import m3u8
# # Replace "input.m3u8" with the actual M3U8 file name
# input_file = "/Users/harsh_1301/Downloads/new.ts"
# # Replace "output.mp4" with the desired MP4 file name
# output_file = "/Users/harsh_1301/Downloads/output.mp4"
# m3u8_url = "https://appx-recordings.livelearn.in/drm/7f16ba77-be1e-413e-98f5-f367c808fcda/720p/drm-hls/master-2035696.8356511395.m3u8.m3u8"
# start_index = 0
# end_index = m3u8_url.rfind('/')
# m3u8_main_url = m3u8_url[start_index:end_index+1]
# # print(m3u8_main_url)
# file_read = requests.get(m3u8_url)
# m3u8_data = m3u8.loads(file_read.text)
# cnt = 0
# total = len(m3u8_data.data['segments'])
# # print(total)
# with open(input_file, 'wb') as ts_file:
#     for segment in m3u8_data.data['segments']:
#         video_url = m3u8_main_url+segment['uri']
#         #print(video_url)
#         print(cnt, " of ", total)
#         cnt = cnt + 1
#         video_read = requests.get(video_url)
#         ts_file.write(video_read.content)
# subprocess.run(['ffmpeg', '-i', input_file, output_file])


