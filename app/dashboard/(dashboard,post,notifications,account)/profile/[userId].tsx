import { followUser, getFollowing } from "@/api/followers";
import { getProfile } from "@/api/profiles";
import { getUserPosts } from "@/api/users";
import { AppButton } from "@/components/ui/AppButton";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Skeleton from "@/components/ui/Skeleton";
import { Post } from "@/db/schema";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as AC from "@bacons/apple-colors";
import { getImageUrl } from "@/utils/images";

export default function ProfileScreen() {
  const { token } = useAuth();
  const glob = useGlobalSearchParams();
  const userId = glob.userId as string;

  const queryClient = useQueryClient();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId, token),
  });

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId, token),
  });

  const { data: following, isLoading: isFollowingLoading } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(token, userId),
  });

  const { mutate: followUserMutation, isPending: isFollowLoading } =
    useMutation({
      mutationFn: ({ unfollow }: { unfollow: boolean }) =>
        followUser(token, userId, unfollow),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["following", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["profile", userId],
        });
      },
    });

  return (
    <BodyScrollView>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: getImageUrl(profile?.imageId ?? "") }}
          style={styles.avatarImage}
        />
        {isProfileLoading ? (
          <Skeleton style={styles.displayNameSkeleton} />
        ) : (
          <Text style={styles.text}>{profile?.displayName}</Text>
        )}
        {isFollowingLoading ? (
          <Skeleton style={styles.displayNameSkeleton} />
        ) : (
          <AppButton
            disabled={isFollowLoading}
            style={following ? styles.unfollowButton : styles.followButton}
            onPress={() => {
              followUserMutation({ unfollow: following ? true : false });
            }}
            isLoading={isFollowLoading}
            icon={
              <IconSymbol
                color={AC.lightText}
                name={
                  following
                    ? "person.fill.badge.minus"
                    : "person.fill.badge.plus"
                }
                size={24}
              />
            }
          >
            {following ? "Unfollow" : "Follow"}
          </AppButton>
        )}
      </View>

      <View style={styles.followerContainer}>
        <Text style={styles.followerText}>{posts?.length} Posts</Text>
        <Text style={styles.followerText}>
          {profile?.followersCount} Followers
        </Text>
        <Text style={styles.followerText}>
          {profile?.followingCount} Following
        </Text>
      </View>

      <View style={styles.postsContainer}>
        {isPostsLoading ? (
          <React.Fragment>
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
            <Skeleton style={styles.postSkeleton} />
          </React.Fragment>
        ) : (
          posts?.map((post) => <PostComponent key={post.id} post={post} />)
        )}
      </View>
    </BodyScrollView>
  );
}

function PostComponent({ post }: { post: Post }) {
  return (
    <View style={styles.post}>
      <Text style={styles.postText}>{post.text}</Text>
      <Text style={styles.timestamp}>
        {formatDistanceToNow(new Date(post.createdAt), {
          addSuffix: true,
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 18,
    marginBottom: 24,
  },
  postSkeleton: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
  followButton: {},
  unfollowButton: {
    backgroundColor: "#aaa",
  },
  displayNameSkeleton: {
    width: 220,
    height: 35,
    borderRadius: 8,
  },
  followerText: {
    color: "white",
    fontSize: 20,
  },
  followerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  postsContainer: {
    gap: 12,
  },
  post: {
    width: "100%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 8,
    gap: 8,
  },
  postText: {
    color: "white",
    fontSize: 22,
  },
  timestamp: {
    fontSize: 16,
    color: "gray",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
