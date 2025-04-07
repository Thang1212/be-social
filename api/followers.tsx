import { FollowUserResponse } from "@/app/api/followers/index+api";

export async function followUser(
  token: string,
  toFollowUserId: string,
  unfollow: boolean
) {
  return fetch("/api/followers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toFollowUserId, unfollow }),
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as FollowUserResponse;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function getFollowing(token: string, userId: string) {
  return fetch(`/api/followers?userId=${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as FollowUserResponse | undefined;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
