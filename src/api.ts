import { IChat } from "./components/ChatsList/chat";
import { IMessage, IProfile } from "./interfaces";

type useRequestType = <T>(
  method: string,
  path: string,
  params?: unknown
) => Promise<T>;

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
      if (params) xhr.send(JSON.stringify(params));
      else xhr.send();
    });
  }

  message() {
    return new MessageAPI(this);
  }
  chats() {
    return new ChatsAPI(this);
  }
  profile() {
    return new ProfileAPI(this);
  }
}
class MessageAPI {
  #request: useRequestType;
  constructor(arg: API) {
    this.#request = arg.useRequest;
  }
  addMessage(props: {
    id: string;
    subject_id: string;
    text_content: string;
    ts: number;
  }) {
    return this.#request<{ response: boolean }>("POST", "message", props);
  }
  getMessages(props: { id: string }) {
    return this.#request<{ response: IMessage[] }>(
      "POST",
      "message/get",
      props
    );
  }
}
class ChatsAPI {
  #request: useRequestType;
  constructor(arg: API) {
    this.#request = arg.useRequest;
  }
  createChat(props: { title: string }) {
    return this.#request<{ response: IChat }>("POST", "chats/create", props);
  }
}
class ProfileAPI {
  #request: useRequestType;
  constructor(arg: API) {
    this.#request = arg.useRequest;
  }
  get() {
    return this.#request<
      IProfile & {
        chats: IChat[];
      }
    >("GET", "profile");
  }
}
export default API;
