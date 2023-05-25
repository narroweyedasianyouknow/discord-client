export interface IMessage {
  id: string;
  ts: number;
  subject_id: string;
  user_id: string;
  user_name: string;
  text_content: string;
  fromMe?: boolean;
  state?: 'unread' | 'read'
}

export interface IProfile {
  login: string;
}
