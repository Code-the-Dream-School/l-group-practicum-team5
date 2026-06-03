import { apiClient } from './apiClient';
import type { ApiSuccess } from './authService';

export type Id = number | string;

export type GroupMember = {
  id: Id;
  name: string;
  email: string;
  joined_at: string;
};

export type GroupMembersResponse = ApiSuccess<{
  members: GroupMember[];
}>;

export type ApiMessageResponse = {
  success: true;
  message: string;
};

export const getGroupMembers = (groupId: Id) =>
  apiClient.get<GroupMembersResponse>(`/groups/${groupId}/members`);

export const leaveGroup = (groupId: Id) =>
  apiClient.delete<ApiMessageResponse>(`/groups/${groupId}/members/me`);

export const removeGroupMember = (groupId: Id, userId: Id) =>
  apiClient.delete<ApiMessageResponse>(`/groups/${groupId}/members/${userId}`);
