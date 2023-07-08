export class UserDevicesSingleton {
      private static instance: UserDevicesSingleton;
      private mediaStream: MediaStream | null = null;
      private initializedAlready = false;

      public async init(
            constraints: MediaStreamConstraints = {
                  audio: true,
            }
      ) {
            this.mediaStream = await navigator.mediaDevices.getUserMedia(
                  constraints
            );
      }
      public static getInstance(): UserDevicesSingleton {
            if (!UserDevicesSingleton.instance) {
                  UserDevicesSingleton.instance = new UserDevicesSingleton();
            }
            return UserDevicesSingleton.instance;
      }

      public async getUserMedia() {
            if (!this.initializedAlready) await this.init();
            return this.mediaStream;
      }
}

const UserDevices = UserDevicesSingleton.getInstance();

export default UserDevices;
