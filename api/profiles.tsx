import { ProfileResponse } from "@/app/api/profiles/[userId]+api";
import { Profile } from "@/db/schema";

export async function getMyProfile(token: string): Promise<Profile> {
  return fetch("/api/profiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function updateProfile(displayName: string, token: string) {
  return fetch("/api/profiles", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ displayName }),
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function updateProfileImage(imageId: string, token: string) {
  return fetch("/api/profile-image", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageId }),
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function getProfile(
  userId: string,
  token: string
): Promise<ProfileResponse> {
  return fetch(`/api/profiles/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
