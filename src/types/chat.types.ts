
export type MsgType = "message";



export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: MsgType;
  isLoading?: boolean;
  searchInfo?: {
    stages: string[];
    query?: string;
    urls?: string[];
    error?: string;
  };
}

export interface MessageAreaProps {
  messages: Message[];
}