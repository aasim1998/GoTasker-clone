export type ProjectDetailsProps = {
  id: number;
  description: string;
  name: string;
  created_at: string;
  client_id: number;
  unread_messages: {};
  status: string;
  pending_notices: PendingNotices;
  pending_notices_count: number;
  created_by_role: string;
  gps_enabled: boolean;
  organization_id: number;
  organization_name: string;
  internal: boolean;
  role_in_project: string;
  client: Client;
  project_tour: boolean;
  manager: Manager;
  subcontractors: Subcontractors;
  chat_users: ChatUsers;
  attachments: Attachments;
  status_code: number;
  success_message: string;
};

export type PendingNotices = {
  id: number;
  referenceable_id: number;
  referenceable_type: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  category: string;
  done: boolean;
  notice_created_by: null;
  message: string;
};

export type Client = {
  id: number;
  name: string;
  full_name: string;
  personal_or_complete_name: string;
  internal_usage: boolean;
  email: string;
  address_one: string;
  address_two: string;
  city: string;
  state: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  zip_code: string;
  full_address: string;
  insurance: null;
};

export type Manager = {
  id: number;
  name: string;
  full_name: string;
  personal_or_complete_name: string;
  internal_usage: boolean;
};

export type Subcontractors = {
  id: number;
  name: string;
  full_name: string;
  personal_or_complete_name: string;
  internal_usage: boolean;
};

export type ChatUsers = {
  id: number;
  name: string;
  full_name: string;
  personal_or_complete_name: string;
  internal_usage: boolean;
};

export type Attachments = {
  id: number;
  attachment_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};
