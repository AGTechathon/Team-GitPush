
# 🎵 RepeatHarmony

AI Mental Health + Music Therapy Platform




## Authors

- [@RishiAnand108](https://www.github.com/RishiAnand108)


# Features

## 🤖 Multimodal AI Detection
- Real-time chat sentiment analysis
- Facial emotion recognition through computer vision
- Voice pattern and tone aLight/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform analysis
- 95%+ accuracy with multimodal AI fusion

## 🎼 Personalized Music Therapy
- Instant therapeutic music recommendations
- Spotify and YouTube Music integration
- AI-curated playlists based on emotional state

## 🆘 Crisis Support Integration
- 24/7 emergency helpline access
- Professional therapy referral system
- Immediate crisis intervention alerts

## Tech Stack

**Frontend:** React.js, HTML5, CSS3, Bootstrap

**Backend:** Node.js, Express.js, MongoDB Atlas

**AI/ML:** Python, TensorFlow, MediaPipe, OpenCV

**APIs:** Spotify Web API, Speech Recognition API

## Installation

# Clone repository
git clone https://github.com/masoom-842155/repeatharmony.git
cd repeatharmony

# Install dependencies
npm install
cd ai-models && pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Start application
npm start

    
## Environment Variables

MONGODB_URL=your_mongodb_connection_string
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FACE_API_KEY=your_face_detection_api_key
SPEECH_API_KEY=your_speech_recognition_key



## Usage/Examples

// Emotion Analysis

const emotionData = await analyzeEmotion({
  textInput: "I'm feeling overwhelmed",
  facialData: webcamStream,
  voiceData: microphoneStream
});

// Music Recommendation
const recommendations = await getMusicTherapy({
  emotionState: emotionData,
  userPreferences: user.preferences
});


## API Reference

#### Get all items

Base URL: https://api.repeatharmony.com/v1

POST /api/emotion/analyze

Analyze multimodal emotion data

Body: { textInput, faceImage, voiceClip }

Returns: { emotion, confidence, intensity }

#### GET /api/music/recommendations

Get personalized music therapy

Query: emotion, intensity, genre

Returns: { playlist, songs[] }
## Contributing

Contributions are always welcome!

### Fork and create feature branch
git checkout -b feature/your-feature

### Commit changes
git commit -m 'Add amazing feature'

### Push and create PR
git push origin feature/your-feature


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

Contact: masoom842155@gmail.com
Issues: Report Bug
Discussions: Join Community

