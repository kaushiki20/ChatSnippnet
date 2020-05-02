import { useEffect, useState, useRef, useCallback } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState([
    {
      id: 1,
      type: "user",
      audioUrl: "",
    },
    {
      id: 2,
      type: "bot",
      audioUrl: "",
    },
  ]);

  // const [currentId, setCurrentId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [botRecording, setBotRecording] = useState(false);
  const recorder = useRef({});
  const currentId = useRef(null);

  useEffect(() => {
    // get audio stream from user's mic
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(function (stream) {
        console.log("ready to record!");
        recorder.current = new MediaRecorder(stream);

        // listen to dataavailable, which gets triggered whenever we have
        // an audio blob available
        recorder.current.addEventListener("dataavailable", onRecordingReady);
      })
      .catch((err) => console.error("getUserMedia failed:", err.name));
  }, []);

  const startRecording = useCallback(
    (id, type, e) => {
      recorder.current.start();

      currentId.current = { id, type };

      console.log("working");
      if (id === 1) {
        setIsRecording(true);
      } else {
        setBotRecording(true);
      }
    },
    [recorder]
  );

  const stopRecording = useCallback(
    (id, type, e) => {
      recorder.current.stop();
      if (id === 1) {
        setIsRecording(false);
      } else {
        setBotRecording(false);
      }
      console.log("stopped");
    },
    [recorder]
  );

  const onRecordingReady = (e) => {
    console.log(currentId.current.id, currentId.current.type);
    let newAudio = audioURL.map((a, i) => {
      if (a.id === currentId.current.id && a.type === currentId.current.type) {
        return { ...a, audioUrl: URL.createObjectURL(e.data) };
      }
      return a;
    });

    setAudioURL(newAudio);
  };

  return [audioURL, isRecording, startRecording, stopRecording, botRecording];
};

export default useRecorder;
