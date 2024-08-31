export interface Beta {
  id?: number;
  title: string;
  description: string;
  location: string;
  user_id: string;
  created_at?: Date;
}

export interface BetaInput {
  title: string;
  description: string;
  location: string;
  user_id: string;
}
