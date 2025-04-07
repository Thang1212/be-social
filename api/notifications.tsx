import { NotificationResponse } from "@/app/api/notifications+api";

export async function getNotifications(token: string) {
  return fetch(`/api/notifications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as NotificationResponse;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
