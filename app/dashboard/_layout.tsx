import Stack from '@/components/ui/Stack';
import Tabs from '@/components/ui/Tabs';
import { View } from 'react-native';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(dashboard)"
        title="Feed"
        systemImage="house.fill"
        options={{
          href: '/dashboard',
        }}
      />
      <Tabs.Screen
        name="(post)"
        title="Post"
        systemImage="plus"
        options={{
          href: '/dashboard/post',
        }}
      />
      <Tabs.Screen
        name="(notification)"
        title="Notifications"
        systemImage="bell.fill"
        options={{
          href: '/dashboard/notifications',
        }}
      />
      <Tabs.Screen
        name="(account)"
        title="Account"
        systemImage="person.fill"
        options={{
          href: '/dashboard/account',
        }}
      />
    </Tabs>
  );
}
