import { apiClient } from './apiClient';
import type { ApiSuccess } from './authService';

export type Id = number | string;

export type Group = {
  id: Id;
  name: string;
  invite_code: string;
  created_by: Id;
  created_at: string;
  updated_at: string;
};

export type CreateGroupPayload = {
  name: string;
};

export type UpdateGroupPayload = {
  name?: string;
};

export type GroupResponse = ApiSuccess<Group>;
export type GroupsResponse = ApiSuccess<Group[]>;
export type DeleteGroupResponse = ApiSuccess<{ deleted: Group }>;

// Backend uses the auth cookie to set created_by.
export const createGroup = (payload: CreateGroupPayload) =>
  apiClient.post<GroupResponse>('/groups', payload);

export const getGroups = () => apiClient.get<GroupsResponse>('/groups');

export const getGroup = (groupId: Id) =>
  apiClient.get<GroupResponse>(`/groups/${groupId}`);

export const updateGroup = (groupId: Id, payload: UpdateGroupPayload) =>
  apiClient.put<GroupResponse>(`/groups/${groupId}`, payload);

export const deleteGroup = (groupId: Id) =>
  apiClient.delete<DeleteGroupResponse>(`/groups/${groupId}`);
