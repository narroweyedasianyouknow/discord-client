import { useRef, useEffect } from "react";
import { SocketSingleton } from "@/utils/socketEventListener";

// TODO Implement this on VoiceChats
export const VoiceChat = () => {
  const peerConnection = useRef(new RTCPeerConnection());
  const sender = useRef(false);
  const socket = useRef(SocketSingleton.getInstance().getSocket());
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    socket.current.on("answer", async (res: RTCSessionDescriptionInit) => {
      await peerConnection.current.setRemoteDescription(res);
    });
    socket.current.on("offer", async (res: RTCSessionDescriptionInit) => {
      if (!sender.current) {
        console.log("offer", res);
        await peerConnection.current.setRemoteDescription(res);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        sender.current = true;
        socket.current.emit("createAnswer", answer);
      }
    });

    socket.current.on("iceCandidate", (res: RTCIceCandidateInit) => {
      peerConnection.current.addIceCandidate(res);
    });
  }, []);

  const handleCreateOffer = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (mediaStream) => {
        mediaStream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, mediaStream);
        });

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        sender.current = true;
        socket.current.emit("createOffer", offer);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  useEffect(() => {
    peerConnection.current.ontrack = (event) => {
      const stream = event.streams[0];
      if (audioRef.current) audioRef.current.srcObject = stream;
      audioRef.current?.play();
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("addIceCandidate", event.candidate);
      }
    };
  }, []);

  return (
    <>
      <button onClick={handleCreateOffer}>Create Offer</button>
      <audio ref={audioRef} controls></audio>
    </>
  );
};
