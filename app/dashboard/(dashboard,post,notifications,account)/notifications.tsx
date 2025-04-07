import { getNotifications } from "@/api/notifications";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Text } from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
  const { token } = useAuth();
  const router = useRouter();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(token),
  });

  return (
    <BodyScrollView style={styles.scrollView}>
      {notifications?.length ? (
        notifications.map((notification) => (
          <Pressable
            key={notification.id}
            style={({ pressed }) => [
              styles.notificationContainer,
              pressed && styles.notificationPressed,
            ]}
            onPress={() => {
              router.back();
              router.push(`/dashboard/profile/${notification.fromUserId}`);
            }}
          >
            <View style={styles.iconContainer}>
              <IconSymbol
                color="#6C63FF"
                name={
                  notification.type === "follow"
                    ? "person.fill.badge.plus"
                    : "message.fill"
                }
                size={28}
              />
            </View>
            <Text style={styles.notificationText}>{notification.content}</Text>
          </Pressable>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol color="#6C63FF" name="bell.slash.fill" size={48} />
          <Text style={styles.emptyText}>No notifications yet</Text>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Feed</Text>
          </Pressable>
        </View>
      )}
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  notificationContainer: {
    padding: 20,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  notificationPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(108, 99, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 16,
    color: "#FFFFFF",
    flexShrink: 1,
    flexWrap: "wrap",
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  backButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
