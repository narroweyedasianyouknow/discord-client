import type { GuildType } from "./containers/GuildsList/guild";
import type {
      CHANNEL_TYPES_LIST,
      ChannelType,
} from "./containers/Sidebar/ChannelsList/channels.interface";

export interface IMessage {
      id: string;
      ts: number;
      subject_id: string;
      user_id: string;
      user_name: string;
      text_content: string;
      state?: "unread" | "read";
}

export interface IProfile {
      login: string;
}
export type InvitesType = {
      code: string;
      guild_id: string;
      expires: number;
      used_count: number;
      max_used_count: number;
};
export type Invite = {
      type: 0;
      code: string;
      inviter: {
            id: string;
            username: string;
            avatar: string;
            public_flags: number;
            flags: number;
            banner: string;   
            accent_color: number;
            global_name: string;
            avatar_decoration: null;
            display_name: string;
            banner_color: string;
      };
      max_age: number;
      created_at: string;
      expires_at: string;
      guild: {
            id: GuildType["id"];
            name: GuildType["name"];
            // ???
            splash: null;
            banner: null;
            description: null;
            icon: GuildType["icon"];
            features: [];
            verification_level: GuildType["verification_level"];
            vanity_url_code: null;
            nsfw_level: GuildType["nsfw_level"];
            nsfw: boolean;
            premium_subscription_count: number;
      };
      guild_id: GuildType["id"];
      channel: {
            id: ChannelType["id"];
            type: CHANNEL_TYPES_LIST;
            name: string;
      };
      uses: number;
      max_uses: number;
      temporary: boolean;
};
