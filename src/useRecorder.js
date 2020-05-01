import { useEffect, useState, useRef, useCallback } from "react";

const useToggle = (initialValue) => {
  const [toggleValue, setToggleValue] = useState(initialValue);
  const toggler = useCallback(() => setToggleValue(!toggleValue), []);

  return [toggleValue, toggler];
};

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");

  const [isRecording, toggleIsRecording] = useToggle(false);

  const recorder = useRef({});

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(function (stream) {
        console.log("ready to record!");
        recorder.current = new MediaRecorder(stream);

        recorder.current.addEventListener("dataavailable", onRecordingReady);
      })
      .catch((err) => console.error("getUserMedia failed:", err.name));
  }, []);

  const startRecording = useCallback(() => {
    recorder.current.start();
    toggleIsRecording();
  }, recorder.current);

  const stopRecording = useCallback(() => {
    recorder.current.stop();
  }, recorder.current);

  const onRecordingReady = (e) => {
    setAudioURL(URL.createObjectURL(e.data));
  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

export default useRecorder;
