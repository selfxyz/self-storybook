import type React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Button } from '../Button/Button';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Svg width={32} height={32} viewBox="0 0 32 32">
          <G fill="none" fillRule="evenodd">
            <Path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <Path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <Path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </G>
        </Svg>
        <Text style={styles.title}>Acme</Text>
      </View>
      <View style={styles.rightSection}>
        {user ? (
          <>
            <Text style={styles.welcome}>
              Welcome, <Text style={styles.welcomeName}>{user.name}</Text>!
            </Text>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    borderBottomWidth: 1,
    borderBottomColor: '#0000001a',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 1,
    marginLeft: 10,
    display: 'inline-flex',
    verticalAlign: 'top',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  welcome: {
    color: '#333',
    fontSize: 14,
    marginRight: 10,
  },
  welcomeName: {
    fontWeight: '700',
  },
});
