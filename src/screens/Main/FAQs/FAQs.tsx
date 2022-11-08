import React from 'react';
import {ComponentWebView} from 'organisms/ComponentWebView';
import Config from 'react-native-config';

export const FAQs = () => {
  return <ComponentWebView title="faq.text" uri={Config.FREQUENTLY_ASKED} />;
};
