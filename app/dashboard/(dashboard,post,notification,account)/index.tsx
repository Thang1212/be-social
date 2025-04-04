import { getPosts } from '@/api/posts';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import { Text } from '@/components/ui/Form';
import { Post } from '@/db/schema';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { getPostResponse } from '@/app/api/posts+api';

export default function Page() {
  const { token } = useAuth();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(token),
  });

  return (
    <BodyScrollView style={styles.container}>
      {isLoading && <Text>Loading ...</Text>}
      {posts?.map((post: any) => <PostComponent key={post.id} post={post} />)}
    </BodyScrollView>
  );
}

function PostComponent({ post }: { post: getPostResponse[number] }) {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.avatarPlaceholder} />
        <View>
          <Text style={styles.displayName}>{post.profile.displayName}</Text>
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
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E1E1E1",
    marginRight: 12,
  },
  postContainer: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestamp: {
    color: '#666666',
    fontSize: 14,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
  skeleton: {
    backgroundColor: '#222',
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
