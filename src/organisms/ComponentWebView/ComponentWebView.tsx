import React from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {WebView} from 'react-native-webview';
import {LocaleString} from 'locales/en';

type ComponentWebViewProps = {
  title?: LocaleString;
  heading?: string;
  uri: string;
};

export const ComponentWebView = ({
  uri,
  title,
  heading,
}: ComponentWebViewProps) => {
  return (
    <Box flex={1}>
      <Navbar backIcon showBack title={title} heading={heading} />
      <WebView
        startInLoadingState={true}
        source={{
          uri: uri,
        }}
      />
    </Box>
  );
};
