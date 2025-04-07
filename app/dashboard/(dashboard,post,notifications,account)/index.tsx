import { getPosts } from "@/api/posts";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Text } from "@/components/ui/Form";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import { GetPostResponse } from "@/app/api/posts+api";
import { useRouter } from "expo-router";
import { getImageUrl } from "@/utils/images";

function SkeletonPost() {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={[styles.avatarImage, styles.skeleton]} />
        <View>
          <View style={[styles.skeletonDisplayName, styles.skeleton]} />
          <View style={[styles.skeletonTimestamp, styles.skeleton]} />
        </View>
      </View>
      <View style={[styles.skeletonText, styles.skeleton]} />
      <View style={[styles.skeletonText, styles.skeleton]} />
    </View>
  );
}

export default function Page() {
  const { token } = useAuth();

  const {
    data: posts,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
  });

  const queryClient = useQueryClient();

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <BodyScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
    >
      {isLoading && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
      {posts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </BodyScrollView>
  );
}

function PostComponent({ post }: { post: GetPostResponse[number] }) {
  const router = useRouter();

  const avatarUrl = post.profile.imageId
    ? getImageUrl(post.profile.imageId)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        post.profile.displayName
     )}&background=random`;

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        <View>
          <Pressable
            onPress={() => router.push(`/dashboard/profile/${post.userId}`)}
          >
            <Text style={styles.displayName}>{post.profile.displayName}</Text>
          </Pressable>
          <Text style={styles.timestamp}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  postContainer: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timestamp: {
    color: "#666666",
    fontSize: 14,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
  skeleton: {
    backgroundColor: "#222",
    opacity: 0.7,
  },
  skeletonDisplayName: {
    height: 16,
    width: 120,
    borderRadius: 4,
    marginBottom: 4,
  },
  skeletonTimestamp: {
    height: 14,
    width: 80,
    borderRadius: 4,
  },
  skeletonText: {
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
});
