# Vision Assistant - Real-Time Object Detection App

## Overview
A React application that helps visually impaired users identify objects in their environment using:

- TensorFlow.js for object detection
- Web Speech API for audio feedback
- COCO-SSD model for real-time detection
- React Webcam for camera access

## Setup Requirements
- Node.js 16.x+ (recommended)
- Webcam
- Modern browser with WebSpeech API support
- Windows OS

## Installation

```bash
git clone https://github.com/yourusername/vision-assistant.git
cd vision-assistant
npm install
npm start
```

## Troubleshooting

### Common Issues

#### Node Version Conflicts
```bash
node -v
# Windows PowerShell
$env:NODE_OPTIONS="--openssl-legacy-provider"
yarn start

# or for npm
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

#### Camera Access
- Ensure browser permissions
- Close other camera apps
- Check system privacy settings

## Key Features
- 🎥 Real-time object detection
- 🔊 Natural voice announcements (In Development)
- 📏 Distance estimation (In Development)
- ⚡ Low-latency processing
- 🎯 Multi-object tracking
- 🔄 Continuous monitoring

## Usage Guide
1. Allow camera permissions when prompted
2. Position camera toward desired area
3. Listen for automatic voice announcements of:
   - Detected objects
   - Approximate distances
   - Location in frame
