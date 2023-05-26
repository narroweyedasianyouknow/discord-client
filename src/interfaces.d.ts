export interface IMessage {
  id: string;
  ts: number;
  subject_id: string;
  user_id: string;
  user_name: string;
  text_content: string;
  state?: 'unread' | 'read'
}

export interface IProfile {
  login: string;
}
