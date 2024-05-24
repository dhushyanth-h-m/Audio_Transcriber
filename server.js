require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Multer setup for file upload handling
const upload = multer({ storage: multer.memoryStorage() });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Upload the audio file to AssemblyAI
    const uploadResponse = await axios.post('https://api.assemblyai.com/v2/upload', req.file.buffer, {
      headers: {
        'authorization': process.env.ASSEMBLYAI_API_KEY,
        'Transfer-Encoding': 'chunked'
      }
    });

    // Submit the transcription request
    const transcriptResponse = await axios.post('https://api.assemblyai.com/v2/transcript', {
      audio_url: uploadResponse.data.upload_url
    }, {
      headers: {
        'authorization': process.env.ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
      }
    });

    // Poll for transcription completion
    const getTranscriptionResult = async (transcriptId) => {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const result = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
            headers: {
              'authorization': process.env.ASSEMBLYAI_API_KEY
            }
          });

          if (result.data.status === 'completed' || result.data.status === 'failed') {
            clearInterval(interval);
            resolve(result.data);
          }
        }, 5000); // Poll every 5 seconds
      });
    };

    const finalResult = await getTranscriptionResult(transcriptResponse.data.id);
    res.render('transcription', { transcription: finalResult.text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the audio file.');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;