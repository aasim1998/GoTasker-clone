import React from 'react';
import {ComponentWebView} from 'organisms/ComponentWebView';
import Config from 'react-native-config';

export const PrivacyPolicy = () => {
  return (
    <ComponentWebView title="privacy.policy" uri={Config.PRIVACY_POLICY} />
  );
};
