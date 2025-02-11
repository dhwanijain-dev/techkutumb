import React, { useState, useRef } from "react";
import axios from "axios";

const AssemblyAIKey = "4c9450849e654441a977a2ebe5c91106"; // Replace with your AssemblyAI API key

const AudioRecorder = () => {
    const [transcript, setTranscript] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);

    // Start recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            audioChunks.current = [];
            sendToAssemblyAI(audioBlob);
        };

        mediaRecorderRef.current.start();
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    // Upload audio and get transcript
    const sendToAssemblyAI = async (audioBlob) => {
        const formData = new FormData();
        formData.append("file", audioBlob);

        // Step 1: Upload audio
        const uploadResponse = await axios.post("https://api.assemblyai.com/v2/upload", formData, {
            headers: { Authorization: AssemblyAIKey },
        });

        const audioUrl = uploadResponse.data.upload_url;

        // Step 2: Request transcription
        const transcriptResponse = await axios.post(
            "https://api.assemblyai.com/v2/transcript",
            { audio_url: audioUrl },
            { headers: { Authorization: AssemblyAIKey, "Content-Type": "application/json" } }
        );

        const transcriptId = transcriptResponse.data.id;

        // Step 3: Poll for transcript completion
        checkTranscriptStatus(transcriptId);
    };

    // Check transcript status
    const checkTranscriptStatus = async (id) => {
        const interval = setInterval(async () => {
            const { data } = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
                headers: { Authorization: AssemblyAIKey },
            });

            if (data.status === "completed") {
                setTranscript(data.text);
                clearInterval(interval);
            }
        }, 3000);
    };

    return (
        <div>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <p>Transcript: {transcript}</p>
        </div>
    );
};

export default AudioRecorder;
