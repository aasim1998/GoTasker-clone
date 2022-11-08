import React from 'react';
import {ComponentWebView} from 'organisms/ComponentWebView';
import Config from 'react-native-config';

export const TermsAndCondition = () => {
  return (
    <ComponentWebView title="terms.service" uri={Config.TERMS_CONDITIONS} />
  );
};
