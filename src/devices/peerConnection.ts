import { SocketSingleton } from "@/utils/socketEventListener";

export class PeerConnectionSingleton {
      private static instance: PeerConnectionSingleton;
      private peerConnection = new RTCPeerConnection();
      private socket = SocketSingleton.getInstance().getSocket();
      private subscribed = false;
      private peerConnectionState: "offer" | "answer" | null = null;

      public subscribe() {
            if (this.subscribed) return false;
            this.subscribed = true;
            this.socket.on("offer", (message) => {
                  if (this.peerConnectionState !== "offer") {
                        this.peerConnection
                              .setRemoteDescription(message)
                              .then(async () => {
                                    const answer =
                                          await this.peerConnection.createAnswer();
                                    await this.peerConnection.setLocalDescription(
                                          answer
                                    );
                                    SocketSingleton.getInstance()
                                          .getSocket()
                                          .emit("createAnswer", answer);
                              });
                  }
            });
            this.socket.on("answer", (message) => {
                  this.peerConnection.setRemoteDescription(message);
            });
            this.socket.on("iceCandidate", (message) => {
                  console.log(this.peerConnection)
                  this.peerConnection.addIceCandidate(message);
            });
      }
      public static getInstance(): PeerConnectionSingleton {
            if (!PeerConnectionSingleton.instance) {
                  PeerConnectionSingleton.instance =
                        new PeerConnectionSingleton();
            }
            return PeerConnectionSingleton.instance;
      }

      public getPeerConnection() {
            return this.peerConnection;
      }
      public getState() {
            return this.peerConnectionState;
      }
      public setState(val: typeof this.peerConnectionState) {
            this.peerConnectionState = val;
            return this.peerConnectionState;
      }

      public async join(channel_id: string) {
            const getRTC = this.socket.emit("join-to-voice", channel_id);
      }
}

const PeerConnection = PeerConnectionSingleton.getInstance();

export default PeerConnection;
