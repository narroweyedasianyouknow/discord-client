
import Typography from "@/components/Typography/Typography";
import VolumeIcon from "@/icons/VolumeIcon";

import { ChannelItemWrapper } from "./ChannelListItem";

import type { ChannelType } from "../channels.interface";


// TODO It's not so easy. I'm dumb
export default function VoiceChannel(props: {
      channel: ChannelType;
      active?: string;
}) {
      const { channel, active } = props;
      // const peerConnectionSingleton = useRef(PeerConnection);

      // const sender = useRef(false);
      // const socket = useRef(SocketSingleton.getInstance().getSocket());
      // const devices = useRef(UserDevices);
      // const audioRef = useRef<HTMLAudioElement>(null);
      // const dispatch = useAppDispatch();

      // const handleSelectChat = useCallback(() => {
      //       const peerConnection =
      //             peerConnectionSingleton.current.getPeerConnection();
      //       peerConnectionSingleton.current.subscribe();
      //       async function join() {
      //             const mediaDevices = await devices.current.getUserMedia();
      //             if (!mediaDevices) return false;
      //             mediaDevices.getTracks().forEach((track) => {
      //                   peerConnection.addTrack(track, mediaDevices);
      //             });
      //             peerConnectionSingleton.current.setState('offer');

      //             const offer = await peerConnection.createOffer();
      //             await peerConnection.setLocalDescription(offer);
      //             sender.current = true;
      //             socket.current.emit("createOffer", offer);
      //             dispatch(setActiveVoice(channel?.id));
      //       }
      //       API.sessions()
      //             .getVoiceSession(channel?.id)
      //             .then(async (res) => {
      //                   // const mediaDevices =
      //                   //       await devices.current.getUserMedia();
      //                   // if (!mediaDevices) return false;

      //                   // mediaDevices.getTracks().forEach((track) => {
      //                   //       peerConnection.addTrack(track, mediaDevices);
      //                   // });
      //                   // await peerConnection.setRemoteDescription(res);
      //                   // dispatch(setActiveVoice(channel?.id));
      //             })
      //             .catch(async (res) => join());
      // }, [dispatch, channel?.id]);

      // useEffect(() => {
      //       const peerConnection =
      //             peerConnectionSingleton.current.getPeerConnection();
      //       peerConnection.ontrack = (event) => {
      //             const stream = event.streams[0];
      //             if (audioRef.current) audioRef.current.srcObject = stream;
      //             audioRef.current?.play();
      //       };

      //       peerConnection.onicecandidate = (event) => {
      //             if (event.candidate) {
      //                   socket.current.emit("addIceCandidate", event.candidate);
      //             }
      //       };
      // }, []);
      return (
            <ChannelItemWrapper
                  $active={active === channel?.id}
                  // onClick={handleSelectChat}
            >
                  <VolumeIcon width={24} height={24} />
                  <Typography
                        color={
                              active !== channel?.id
                                    ? "--channels-default"
                                    : "--interactive-active"
                        }
                        fontWeight={700}
                  >
                        {channel?.name ?? ""}
                  </Typography>
            </ChannelItemWrapper>
      );
}
