import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Header } from '../Header/Header';

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <View style={styles.container}>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.page}>
          <Text style={styles.heading}>Pages in Storybook</Text>
          <Text style={styles.paragraph}>
            We recommend building UIs with a{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://componentdriven.org')}
            >
              component-driven
            </Text>{' '}
            process starting with atomic components and ending with pages.
          </Text>
          <Text style={styles.paragraph}>
            Render pages with mock data. This makes it easy to build and review page states without
            needing to navigate to them in your app. Here are some handy patterns for managing page
            data in Storybook:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              • Use a higher-level connected component. Storybook helps you compose such data from
              the "args" of child component stories
            </Text>
            <Text style={styles.listItem}>
              • Assemble data in the page component from your services. You can mock these services
              out using Storybook.
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Get a guided tutorial on component-driven development at{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://storybook.js.org/tutorials/')}
            >
              Storybook tutorials
            </Text>
            . Read more in the{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://storybook.js.org/docs')}
            >
              docs
            </Text>
            .
          </Text>
          <View style={styles.tipWrapper}>
            <View style={styles.tipBadge}>
              <Text style={styles.tipText}>Tip</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipDescription}>
                Adjust the width of the canvas with the{' '}
                <Svg width={10} height={10} viewBox="0 0 12 12" style={styles.tipIcon}>
                  <G fill="none" fillRule="evenodd">
                    <Path
                      d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                      fill="#999"
                    />
                  </G>
                </Svg>{' '}
                Viewports addon in the toolbar
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    padding: 48,
  },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: 20,
    display: 'flex',
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333',
  },
  link: {
    color: '#1ea7fd',
    textDecorationLine: 'none',
    fontWeight: '700',
  },
  list: {
    marginBottom: 16,
    paddingLeft: 20,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 8,
    color: '#333',
  },
  tipWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#0000001a',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#F3F5F7',
    marginTop: 24,
  },
  tipBadge: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 28,
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1ea7fd',
    textTransform: 'uppercase',
  },
  tipContent: {
    flex: 1,
    justifyContent: 'center',
  },
  tipDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#333',
  },
  tipIcon: {
    display: 'flex',
    verticalAlign: 'middle',
  },
});
