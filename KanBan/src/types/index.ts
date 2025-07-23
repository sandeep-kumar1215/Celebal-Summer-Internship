import { type LucideIcon } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export interface WORKSPACE_TYPE {
  id?: string;
  ownerId?: string;
  owner?: USER_TYPE;
  name?: string;
  joinUrl?: string;
  avatarUrl?: string;
  joinUsers?: JOIN_WORKSPACE_TYPE[] | USER_TYPE[];
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}

export interface JOIN_WORKSPACE_TYPE {
  id?: string;
  workspaceId?: string;
  userId?: string;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}

export interface USER_TYPE {
  id?: string;
  uid?: string; // use for firebase firestore
  displayName?: string;
  email?: string;
  phoneNumber?: string | number;
  photoURL?: string;
}

export interface SLIDEBAR_ITEM_TYPE {
  title: string;
  url: string;
  icon?: LucideIcon | string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface PROJECT_TYPE {
  id?: string;
  name?: string;
  workspaceId?: string;
  workspace?: WORKSPACE_TYPE;
  avatarUrl?: string;
  joinUsers?: JOIN_WORKSPACE_TYPE[] | USER_TYPE[];
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}

export interface TASK_TYPE {
  id?: string;
  name?: string;
  description?: string;
  workspaceId?: string;
  workspace?: WORKSPACE_TYPE;
  assigneeId?: string;
  assignee?: USER_TYPE;
  projectId?: string;
  project?: PROJECT_TYPE;
  status?: string;
  dueAt?: string | Timestamp | Date;
  createdBy?: string;
  createdUser?: USER_TYPE;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}

export interface KANBAN_COLUMN_TYPE {
  id: string;
  name: string;
  count: number;
}

export interface NOTIFICATION_TYPE {
  id?: string;
  name?: string;
  url?: string;
  senderId?: string;
  sender?: USER_TYPE;
  receiverId?: string;
  receiver?: USER_TYPE;
  isSeen?: boolean;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}
