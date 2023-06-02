import React from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

export default function ReactHookSTT() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        crossBrowser: true,
        googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        useLegacyResults: false
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div>
            <h1>Recording: {isRecording.toString()}</h1>
            <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <ul>
                {results.map((result) => (
                    <li key={result.timestamp}>{result.transcript}</li>
                ))}
                {interimResult && <li>{interimResult}</li>}
            </ul>
        </div>
    );
}