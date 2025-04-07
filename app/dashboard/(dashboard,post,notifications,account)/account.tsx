import { secureDelete } from "@/utils/storage";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as AC from "@bacons/apple-colors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  updateProfile,
  updateProfileImage,
} from "@/api/profiles";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@/api/storage";
import { getImageUrl } from "@/utils/images";

export default function Page() {
  const router = useRouter();
  const { token } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(token),
  });

  const queryClient = useQueryClient();

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(profile?.displayName ?? "");
  }, [profile]);

  async function handleUpdateProfile() {
    if (!displayName) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1400);

    await updateProfile(displayName, token).catch((error) => {
      console.error(error);
    });
  }

  async function handleChangePicture() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      const fileId = await uploadFile(selectedImage, token);
      await updateProfileImage(fileId, token).then(() => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({
          queryKey: ["profile", profile?.userId],
        });
      });
    }
  }

  return (
    <Form.List navigationTitle="Settings">
      <Form.Section title="Avatar">
        <Form.HStack>
          <View style={styles.avatarContainer}>
            {profile?.imageId && (
              <Image
                source={{ uri: getImageUrl(profile.imageId) }}
                style={styles.avatarImage}
              />
            )}
          </View>
          <Form.Text onPress={handleChangePicture}>
            Change Profile Picture
          </Form.Text>
        </Form.HStack>
      </Form.Section>

      <Form.Section title="Profile">
        <Form.HStack>
          <IconSymbol color={AC.lightText} name="info" size={24} />
          {isLoadingProfile ? (
            <ActivityIndicator />
          ) : (
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
            />
          )}
          {!isLoadingProfile && (
            <Pressable
              onPress={() => {
                handleUpdateProfile();
              }}
            >
              <IconSymbol
                color={isSaving ? AC.systemGreen : AC.lightText}
                name={isSaving ? "checkmark.circle" : "checkmark"}
                size={24}
              />
            </Pressable>
          )}
        </Form.HStack>
      </Form.Section>
      <Form.Section title="Security">
        <Form.HStack>
          <IconSymbol
            color={AC.systemRed}
            name="person.fill.badge.minus"
            size={24}
          />
          <Form.Text
            onPress={() => {
              secureDelete("token");
              router.replace("/");
            }}
          >
            Sign Out
          </Form.Text>
        </Form.HStack>
      </Form.Section>
    </Form.List>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    color: AC.lightText,
    borderColor: AC.lightText,
    borderRadius: 8,
    padding: 8,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AC.lightText,
  },
});
