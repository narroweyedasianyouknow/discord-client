import type { GuildType, PersonType } from "./GuildsList/guild";
import type { ChannelType, IChat } from "./components/ChannelsList/channels.interface";
import type { MessagesType } from "./components/messages.interface";
import type { IMessage } from "./interfaces";

class API {
  static getURI() {
    return "http://localhost:3000/";
  }

  useRequest<T>(method: string, path = "", params?: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${API.getURI()}${path}`;
      xhr.withCredentials = true;
      xhr.open(method, url);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.responseText);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      if (params)
        xhr.send(params instanceof FormData ? params : JSON.stringify(params));
      else xhr.send();
    });
  }

  message() {
    return new MessageAPI();
  }
  chats() {
    return new ChatsAPI();
  }
  guilds() {
    return new GuildsAPI();
  }
  profile() {
    return new ProfileAPI();
  }
  upload() {
    return new UploadAPI();
  }
}
class MessageAPI extends API {
  addMessage(props: Partial<MessagesType>) {
    return this.useRequest<{ response: boolean }>("POST", "messages", props);
  }
  getMessages(props: { id: string }) {
    return this.useRequest<{ response: IMessage[] }>(
      "POST",
      "message/get",
      props
    );
  }
}
class ChatsAPI extends API {
  createChat(props: { title: string }) {
    return this.useRequest<{ response: IChat }>("POST", "chats/create", props);
  }
}
class UploadAPI extends API {
  uploadAvatar({ file }: { file: HTMLInputElement["files"] }) {
    return new Promise((res: (data: any[]) => any, rej) => {
      if (file && file[0]) {
        const formData = new FormData();

        formData.append("file", file[0]);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:3000/avatar`, true);
        xhr.onload = function (e: any) {
          try {
            res(JSON.parse(e.target.response).response);
          } catch (e) {
            console.log("e", e);
            rej(e);
          }
        };
        xhr.send(formData);
      } else {
        rej();
      }
    });
  }
}
class GuildsAPI extends API {
  #links = {
    GET_MY_GUILD: "guild/my",
    GUILD_CREATE: "guild/create",
  };

  getMyGuilds() {
    return this.useRequest<{
      response: (GuildType & { channels: ChannelType[] })[];
    }>("GET", this.#links.GET_MY_GUILD);
  }
  createGuild(props: { name: string; avatar?: string }) {
    return this.useRequest<{ response: GuildType }>(
      "POST",
      this.#links.GUILD_CREATE,
      props
    );
  }
}
class ProfileAPI extends API {
  #links = {
    GET_MY_PROFILE: "person/me",
    REGISTRATION: "person/person",
    LOGIN: "person/login",
  };

  get() {
    return this.useRequest<{ response: PersonType }>(
      "GET",
      this.#links.GET_MY_PROFILE
    );
  }
  login(args: { email?: string; username?: string; password: string }) {
    return this.useRequest<{
      response: PersonType;
    }>("POST", this.#links.LOGIN, args);
  }
  register(args: {
    username: string;
    email: string;
    password: string;
    locale: string;
  }) {
    return this.useRequest<{ response: PersonType }>(
      "POST",
      this.#links.REGISTRATION,
      args
    );
  }
}
export default API;
