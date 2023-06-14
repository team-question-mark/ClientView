import React, { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';

export default function ReactHookSTT({ socket,roomId,signUser,onVideoQueueUpdate}) {
    const roomServerApi=process.env.REACT_APP_ROOM_SERVER_API
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


    useEffect(() => {
        if (results.length > 0) {
          const lastResult = results[results.length - 1];
          console.log("sad:"+lastResult.transcript)
          axios
          .post(roomServerApi + '/sentenceAnalysis', { sentence: lastResult.transcript })
          .then((response) => {
            // API 요청 성공 시 실행되는 코드
            console.log(roomId)
            console.log(response.data);
            socket.emit("ksl_ani",response.data,roomId)
            onVideoQueueUpdate(response.data); // 받은 영상 URL로 videoQueue 상태 업데이트
          })
          .catch((error) => {
            // API 요청 실패 시 실행되는 코드
            console.error(error);
          });
        }
      }, [results]);

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    return (
        <div>
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