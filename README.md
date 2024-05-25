# AssemblyAI Transcription App

This is a web application built with Node.js and Express.js that provides speech-to-text transcription capabilities using the AssemblyAI API. Users can upload audio files, and the app will process them, transcribe the audio content, and display the resulting text.

## Features

- Audio file upload
- Integration with AssemblyAI API for transcription
- Real-time transcription with progress updates
- Clean and user-friendly interface
- Error handling and validation

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 12 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dhushyanth-h-m/Audio_Transcriber.git
```

2. Navigate to the project directory:
```bash
cd Audio_Transcriber
```
3. Install the dependencies:
```bash
npm install
```
4. Create a .env file in the project root and add your AssemblyAI API key:
```bash
ASSEMBLYAI_API_KEY=your_api_key_here
```

## Usage

1. Start the application:
```bash
npm start
```
2. Open your web browser and navigate to http://localhost:3000.
3. Click the "Choose File" button and select an audio file from your local machine.
4. The app will upload the file to AssemblyAI and initiate the transcription process.
5. Once the transcription is complete, the resulting text will be displayed on the page.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
