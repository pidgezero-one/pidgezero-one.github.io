#!/bin/bash
outputPath="/Users/stefanie.kischak/other code/pidgezero-one.github.io/remake_timings/resources/$3"
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" "$1" -o "$outputPath.mp4"
curl -L -o "$outputPath.png" "$2"