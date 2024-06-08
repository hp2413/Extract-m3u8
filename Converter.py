import requests
import subprocess
import m3u8
# Replace "input.m3u8" with the actual M3U8 file name
input_file = "/Users/harsh_1301/Downloads/new.ts"
# Replace "output.mp4" with the desired MP4 file name
output_file = "/Users/harsh_1301/Downloads/output.mp4"
m3u8_url = "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XM/9XM.isml/9XM-audio_208482_und=208000-video=247600.m3u8"
start_index = 0
end_index = m3u8_url.rfind('/')
print(" ")
print(end_index)
print(" ")
m3u8_main_url = m3u8_url[start_index:end_index+1]
print(" ")
print(m3u8_main_url)
print(" ")
file_read = requests.get(m3u8_url)
print(" ")
print(file_read)
print(" ")
m3u8_data = m3u8.loads(file_read.text)
print(" ")
print(m3u8_data.data)
print(" ")
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
subprocess.run(['ffmpeg', '-i', input_file, output_file])