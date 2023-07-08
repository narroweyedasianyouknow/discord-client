import { BACKEND_URI } from "@/constants";
import type {
      PersonType,
      ResponseGuildType,
} from "@/containers/GuildsList/guild";
import type { ChannelType } from "@/containers/Sidebar/ChannelsList/channels.interface";
import type { InvitesType } from "@/interfaces";
import type { VoiceSessionType } from "@/types/voice";

import type {
      AttachmentType,
      MessagesType,
} from "@containers/ChatBody/MessagesWrapper/messages.interface";

class API {
      protected static URI = `${BACKEND_URI}/`;

      protected useRequest<ResponseObject, J extends boolean = false>(
            method: string,
            path = "",
            params?: unknown,
            withAbort = false
      ): J extends true
            ? {
                    promise: Promise<ResponseObject>;
                    cancel: () => void | undefined;
              }
            : Promise<ResponseObject> {
            const url = `${API.URI}${path}`;
            const abort: {
                  controller?: AbortController;
                  signal?: AbortSignal;
            } = {
                  controller: undefined,
                  signal: undefined,
            };
            if (withAbort) {
                  abort.controller = new AbortController();
                  abort.signal = abort.controller.signal;
            }

            const options: RequestInit = {
                  method,
                  headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                  },
                  credentials: "include",
                  signal: abort.signal,
            };

            if (params) {
                  if (params instanceof FormData) options.body = params;
                  else options.body = JSON.stringify(params);
            }

            const request: Promise<ResponseObject> = fetch(url, options).then(
                  async (response) => {
                        if (!response.ok) {
                              throw new Error((await response.json()).message);
                        }
                        
                        try {
                              return response.json();
                        } catch {
                              return true;
                        }
                  }
            );

            if (withAbort) {
                  return {
                        promise: request,
                        cancel: () => abort.controller?.abort(),
                  } as J extends true
                        ? {
                                promise: Promise<ResponseObject>;
                                cancel: () => void;
                          }
                        : never;
            } else {
                  return request as J extends true
                        ? never
                        : Promise<ResponseObject>;
            }
      }

      static message() {
            return new MessageAPI();
      }
      static channel() {
            return new ChannelAPI();
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
      static invites() {
            return new InvitesAPI();
      }
      static sessions() {
            return new SessionsAPI();
      }
}

class MessageAPI extends API {
      addMessage(props: Partial<MessagesType>) {
            return this.useRequest("POST", "messages", props, false);
      }
      getMessages(props: { id: string }) {
            return this.useRequest<{ response: MessagesType[] }>(
                  "POST",
                  "messages/get",
                  props,
                  false
            );
      }
}
class ChannelAPI extends API {
      private readonly links = {
            CREATE_CHANNEL: "channels/create",
      };

      createChannel(props: Partial<ChannelType>) {
            return this.useRequest<{ response: ChannelType }>(
                  "POST",
                  this.links.CREATE_CHANNEL,
                  props,
                  false
            );
      }
}
class InvitesAPI extends API {
      private readonly links = {
            CREATE: "invites/create",
            USE: "invites/use/{{code}}",
      };

      createInvite(props: { guild_id: string }) {
            return this.useRequest<InvitesType>(
                  "POST",
                  this.links.CREATE,
                  props,
                  false
            );
      }
      useInvite( code: string ) {
            return this.useRequest<ResponseGuildType | string>(
                  "POST",
                  this.links.USE.replace("{{code}}", code),
                  undefined,
                  false
            );
      }
}
class SessionsAPI extends API {
      private readonly links = {
            GET: "sessions/{{id}}",
      };

      getVoiceSession(channel_id: string) {
            return this.useRequest<VoiceSessionType>(
                  "POST",
                  this.links.GET.replace("{{id}}", channel_id),
                  undefined,
                  false
            );
      }
}
class UploadAPI extends API {
      uploadAvatar({ file }: { file: File }) {
            return new Promise(
                  (
                        res: (data: {
                              description: string;
                              content_type: string;
                              filename: string;
                              size: number;
                              width: number;
                              height: number;
                        }) => any,
                        rej
                  ) => {
                        if (file) {
                              const formData = new FormData();

                              formData.append("file", file);
                              const xhr = new XMLHttpRequest();
                              xhr.open(
                                    "POST",
                                    `${BACKEND_URI}/files/avatar`,
                                    true
                              );
                              xhr.onload = function (e: any) {
                                    try {
                                          res(
                                                JSON.parse(e.target.response)
                                                      .response
                                          );
                                    } catch (e) {
                                          console.log("e", e);
                                          rej(e);
                                    }
                              };
                              xhr.send(formData);
                        } else {
                              rej();
                        }
                  }
            );
      }
      uploadFiles({ files }: { files: File[] }) {
            return new Promise((res: (data: AttachmentType[]) => void, rej) => {
                  if (files && files[0]) {
                        const formData = new FormData();

                        for (const file of files) {
                              formData.append("files", file);
                        }
                        const xhr = new XMLHttpRequest();
                        xhr.open(
                              "POST",
                              `${BACKEND_URI}/files/attachments`,
                              true
                        );
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
      private readonly links = {
            GET_MY_GUILD: "guild/my",
            GUILD_CREATE: "guild/create",
            JOIN_GUILD: "guild/join",
      };

      getMyGuilds() {
            return this.useRequest<{
                  response: ResponseGuildType[];
            }>("GET", this.links.GET_MY_GUILD, undefined, false);
      }
      createGuild(props: { name: string; avatar?: string }) {
            return this.useRequest<{ response: ResponseGuildType }>(
                  "POST",
                  this.links.GUILD_CREATE,
                  props,
                  false
            );
      }
      joinToGuild(props: { guild_id: string }) {
            return this.useRequest<{ response: ResponseGuildType | string }>(
                  "POST",
                  this.links.JOIN_GUILD,
                  props,
                  false
            );
      }
}
class ProfileAPI extends API {
      private readonly links = {
            GET_MY_PROFILE: "person/me",
            REGISTRATION: "person/create",
            LOGIN: "person/login",
      };

      get() {
            return this.useRequest<{ response: PersonType }>(
                  "GET",
                  this.links.GET_MY_PROFILE,
                  undefined,
                  false
            );
      }
      login(args: { email?: string; username?: string; password: string }) {
            return this.useRequest<{
                  response: PersonType;
            }>("POST", this.links.LOGIN, args, false);
      }
      register(args: {
            username: string;
            email: string;
            password: string;
            locale?: string;
      }) {
            return this.useRequest<{ response: PersonType }>(
                  "POST",
                  this.links.REGISTRATION,
                  args,
                  false
            );
      }
}
export default API;
