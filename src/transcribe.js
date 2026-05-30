const { AssemblyAI } = require('assemblyai');
const fs = require('fs');
require('dotenv').config();

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_KEY
});

async function transcribeAudio(audioFilePath) {
    console.log('Transcribing:', audioFilePath);

    const transcript = await client.transcripts.transcribe({
        audio: fs.readFileSync(audioFilePath),
        speech_models: ['universal-2']
    });

    if (transcript.status === 'error') {
        console.error('Error:', transcript.error);
        return;
    }

    console.log('Done! Transcript:');
    console.log(transcript.text);

    return transcript.text;
}

transcribeAudio('test.mp3');