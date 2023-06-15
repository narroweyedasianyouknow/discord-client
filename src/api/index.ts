import { BACKEND_URI } from "@/constants";
import type {
  PersonType,
  ResponseGuildType,
} from "@/containers/GuildsList/guild";
import type { IChat } from "../components/ChannelsList/channels.interface";
import type {
  AttachmentType,
  MessagesType,
} from "../containers/ChatBody/MessagesWrapper/messages.interface";

class API {
  protected static URI = `${BACKEND_URI}/`;

  protected useRequest<T>(
    method: string,
    path = "",
    params?: unknown
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${API.URI}${path}`;
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

  static message() {
    return new MessageAPI();
  }
  static chats() {
    return new ChatsAPI();
  }
  static guilds() {
    return new GuildsAPI();
  }
  static profile() {
    return new ProfileAPI();
  }
  static upload() {
    return new UploadAPI();
  }
}

class MessageAPI extends API {
  addMessage(props: Partial<MessagesType>) {
    return this.useRequest<{ response: boolean }>("POST", "messages", props);
  }
  getMessages(props: { id: string }) {
    return this.useRequest<{ response: MessagesType[] }>(
      "POST",
      "messages/get",
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
        xhr.open("POST", `${BACKEND_URI}/avatar`, true);
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
  uploadFiles({ file }: { file: HTMLInputElement["files"] }) {
    return new Promise((res: (data: AttachmentType[]) => void, rej) => {
      if (file && file[0]) {
        const formData = new FormData();

        for (let i = 0; file.length > i; i++) {
          const _file = file.item(i);
          if (_file) {
            formData.append("files", _file);
          }
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${BACKEND_URI}/attachments/files`, true);
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
    JOIN_GUILD: "guild/join",
  };

  getMyGuilds() {
    return this.useRequest<{
      response: ResponseGuildType[];
    }>("GET", this.#links.GET_MY_GUILD);
  }
  createGuild(props: { name: string; avatar?: string }) {
    return this.useRequest<{ response: ResponseGuildType }>(
      "POST",
      this.#links.GUILD_CREATE,
      props
    );
  }
  joinToGuild(props: { guild_id: string }) {
    return this.useRequest<{ response: ResponseGuildType | string }>(
      "POST",
      this.#links.JOIN_GUILD,
      props
    );
  }
}
class ProfileAPI extends API {
  #links = {
    GET_MY_PROFILE: "person/me",
    REGISTRATION: "person/create",
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
    locale?: string;
  }) {
    return this.useRequest<{ response: PersonType }>(
      "POST",
      this.#links.REGISTRATION,
      args
    );
  }
}
export default API;
