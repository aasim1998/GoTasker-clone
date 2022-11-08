import {navigate} from 'services/NavigationService';
const ic_incoming = require('images/ic_incoming.png');
const ic_active_jobs = require('images/ic_active_jobs.png');
const ic_contacts = require('images/ic_contacts.png');
const ic_quotes = require('images/ic_quotes.png');
const ic_my_organisation = require('images/ic_my_organisation.png');
const ic_techsub = require('images/ic_techsub.png');
const ic_managers = require('images/ic_managers.png');
const ic_organisation = require('images/ic_organisation.png');
const ic_client = require('images/ic_client.png');
const settingIcon = require('images/ic_setting.png');

export const success = require('images/passwordsuccess.png');
export const closeicon = require('images/closeCross.png');
export const imageCalendar = require('images/calendar.png');
export const profilePlaceholder = require('images/profile_placeholder.png');
export const caution = require('images/caution.png');
export const linkedin = require('images/linkedin.png');
export const facebook = require('images/facebook.png');
export const instagram = require('images/instagram.png');
export const youtube = require('images/youtube.png');
export const logotImg = require('images/logout_face.png');
export const editProfileIcon = require('images/ic_edit_profile.png');
export const ChangePasswordIcon = require('images/reset_password.png');
export const AcceptIcon = require('images/greenCheckCircle.png');
export const ChangePasswordConfirmationScreen = navigate('Confirmation');
export const GlobalVariables = {
  Dashboard: 'Dashboard',
  Profile: 'Profile',
  Feeds: 'Feeds',
  feeds: 'feeds',
  Calendar: 'Calendar',
  BottomNavigator: 'BottomNavigator',
  ChangePassword: 'ChangePassword',
  Contacts: 'Contacts',
  DashboardScreen: 'DashboardScreen',
  PendingAction: 'PendingAction',
  EditProfileScreen: 'EditProfileScreen',
  SettingScreen: 'SettingScreen',
  ProjectDetails: 'Projects',
  LoginScreen: 'LoginScreen',
  ActiveJobScreen: 'ActiveJobScreen',
  OrganizationScreen: 'OrganizationScreen',
  ActiveServices: 'ActiveServices',
  SelectClient: 'SelectClient',
  Confirmation: 'Confirmation',
  ExpressQuote: 'ExpressQuote',
  Dismiss: 'DISMISS',
  SampleDate: '20/08/2015',
  ServiceText: 'NEW SERVICE CREATED',
  MessageText: 'NEW MESSAGE RECEIVED',
  EventText: 'NEW EVENT SCHEDULED',
  QuoteTextNew: 'NEW QUOTE RECEIVED',
  QuoteTextAccepted: 'QUOTE ACCEPTED',
  QuoteTextRejected: 'QUOTE REJECTED',
  FileText: 'NEW FILE UPLOADED',
  JobComplete: 'JOB COMPLETED',
  ServiceButton: 'VIEW SERVICE',
  FileButton: 'VIEW FILE',
  QuoteButton: 'VIEW QUOTE',
  MessageButton: 'VIEW MESSAGE',
  Day: 'Tue',
  Month: 'Jul',
  Date: '12',
  Time: '05:34 pm',
  TodoListText: 'ADDED IN NEW TODO LIST',
  ForClientText: 'FOR CLIENT :',
  TodolistButton: 'VIEW TO-DO LIST',
  successString: 'success',
  failure: 'failure',
  Work: 'work',
  Visit: 'visit',
  MyCalendar: 'my_calendar',
  Subcontractor: 'subcontractor',
  Client: 'client',
  Pending: 'pending',
  organizationErrorMessage: 'Mandatory field cannot be Empty',
  ValidationEvent: 'You can not edit past event',
  organizationValidErrorMessage: 'field is Not valid',
  CreateFeeds: 'CreateFeeds',
  ListFeeds: 'ListFeeds',
  SavedFeeds: 'SavedFeeds',
  OthersFeeds: 'OthersFeeds',
  FeedDetails: 'FeedDetails',
  EditFeeds: 'EditFeeds',
  TermsAndCondition: 'TermsAndCondition',
  PrivacyPolicy: 'PrivacyPolicy',
  CalendarEventModal: 'CalendarEventModal',
  InsuranceScreen: 'InsuranceScreen',
  FeedStackScreen: 'FeedStackScreen',
  ForgotPassword: 'ForgotPassword',
  dataDashboard_Owner: [
    {
      imageURL: ic_incoming,
      title: 'inbox.txt',
      onPress: () => navigate(GlobalVariables.PendingAction),
      prop: true,
    },
    {
      imageURL: ic_active_jobs,
      title: 'active.jobs.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
    {
      imageURL: ic_contacts,
      title: 'contacts.txt',
      onPress: () => navigate(GlobalVariables.Contacts),
    },
    {
      imageURL: ic_quotes,
      title: 'express.quote.txt',
      onPress: () => navigate(GlobalVariables.ExpressQuote),
    },
  ],
  dataDashboard_Client: [
    {
      imageURL: ic_incoming,
      title: 'inbox.txt',
      onPress: () => navigate(GlobalVariables.PendingAction),
      prop: true,
    },
    {
      imageURL: ic_active_jobs,
      title: 'active.jobs.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
    {
      imageURL: ic_contacts,
      title: 'contacts.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
  ],
  dataDashboard_Subcontractor: [
    {
      imageURL: ic_incoming,
      title: 'inbox.txt',
      onPress: () => navigate(GlobalVariables.PendingAction),
      prop: true,
    },
    {
      imageURL: ic_active_jobs,
      title: 'active.jobs.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
    {
      imageURL: ic_contacts,
      title: 'contacts.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
  ],
  dataDashboard_Manager: [
    {
      imageURL: ic_incoming,
      title: 'inbox.txt',
      onPress: () => navigate(GlobalVariables.PendingAction),
      prop: true,
    },
    {
      imageURL: ic_active_jobs,
      title: 'active.jobs.txt',
      onPress: () => navigate(GlobalVariables.ActiveJobScreen),
    },
    {
      imageURL: ic_contacts,
      title: 'contacts.txt',
      onPress: () => navigate(GlobalVariables.Contacts),
    },
    {
      imageURL: ic_quotes,
      title: 'express.quote.txt',
      onPress: () => navigate(GlobalVariables.ExpressQuote),
    },
  ],
  dataContacts_Owner: [
    {
      imageURL: ic_my_organisation,
      title: 'contacts.client',
      //onPress: () => navigate('Client'),
    },
    {
      imageURL: ic_techsub,
      title: 'contacts.tech',
    },
    {
      imageURL: ic_managers,
      title: 'contacts.managers',
    },
    {
      imageURL: ic_organisation,
      title: 'contacts.organization',
    },
  ],
  dataContacts_Manager: [
    {
      imageURL: ic_my_organisation,
      title: 'contacts.client',
      //onPress: () => navigate('Client'),
    },
    {
      imageURL: ic_techsub,
      title: 'contacts.tech',
    },
    {
      imageURL: ic_organisation,
      title: 'contacts.organization',
    },
  ],
  dataProfile_Owner: [
    {
      imageURL: ic_organisation,
      title: 'profile.organization',
      onPress: () => navigate(GlobalVariables.OrganizationScreen),
    },
    {
      imageURL: settingIcon,
      title: 'profile.setting',
      onPress: () => navigate('SettingScreen'),
    },
    {
      imageURL: ic_incoming,
      title: 'profile.insurance',
      onPress: () => navigate('InsuranceScreen'),
    },
  ],
  dataProfile_Client: [
    {
      imageURL: ic_client,
      title: 'profile.edit',
      onPress: () => navigate('EditProfileScreen'),
    },
    {
      imageURL: settingIcon,
      title: 'profile.setting',
      onPress: () => navigate('SettingScreen'),
    },
  ],
  dataProfile_Subcontractor: [
    {
      imageURL: ic_client,
      title: 'profile.edit',
      onPress: () => navigate('EditProfileScreen'),
    },
    {
      imageURL: settingIcon,
      title: 'profile.setting',
      onPress: () => navigate('SettingScreen'),
    },
  ],
  dataProfile_Manager: [
    {
      imageURL: ic_client,
      title: 'profile.edit',
      onPress: () => navigate('EditProfileScreen'),
    },
    {
      imageURL: settingIcon,
      title: 'profile.setting',
      onPress: () => navigate('SettingScreen'),
    },
  ],
  categoryList: [
    {id: '1', name: 'Supplier Specials'},
    {id: '2', name: "Contractors Promo's"},
    {id: '3', name: 'Service Specials'},
    {id: '4', name: 'Discount Specials'},
  ],
  serviceList: [
    {id: '1', name: 'Architect'},
    {id: '2', name: 'Audio / Visual'},
    {id: '3', name: 'Cabinetry'},
    {id: '4', name: 'Carpenters'},
    {id: '5', name: 'Electrician'},
    {id: '6', name: 'Flooring'},
    {id: '7', name: 'General Contractor'},
    {id: '8', name: 'HVAC'},
    {id: '9', name: 'Handymam'},
    {id: '10', name: 'Interior Designer'},
    {id: '12', name: 'Landscaper'},
    {id: '13', name: 'Mason'},
    {id: '14', name: 'Other'},
    {id: '15', name: 'Painter'},
    {id: '16', name: 'Plumber'},
    {id: '17', name: 'Roofing'},
    {id: '18', name: 'Sheetrock'},
    {id: '19', name: 'Supplier'},
    {id: '20', name: 'tile'},
    {id: '21', name: 'Tree Service'},
  ],
  stateList: [
    {id: '1', name: 'AK'},
    {id: '2', name: 'AL'},
    {id: '3', name: 'AR'},
    {id: '4', name: 'AZ'},
    {id: '5', name: 'CA'},
    {id: '6', name: 'CO'},
    {id: '7', name: 'CT'},
    {id: '8', name: 'DE'},
    {id: '9', name: 'FL'},
    {id: '10', name: 'GA'},
    {id: '12', name: 'HI'},
    {id: '13', name: 'IA'},
    {id: '14', name: 'ID'},
    {id: '15', name: 'IL'},
    {id: '16', name: 'IN'},
    {id: '17', name: 'KS'},
    {id: '18', name: 'KY'},
    {id: '19', name: 'LA'},
    {id: '20', name: 'MA'},
    {id: '21', name: 'MD'},
    {id: '22', name: 'ME'},
    {id: '23', name: 'MI'},
    {id: '24', name: 'MN'},
    {id: '25', name: 'MO'},
    {id: '26', name: 'MS'},
    {id: '27', name: 'MT'},
    {id: '28', name: 'NC'},
    {id: '29', name: 'ND'},
    {id: '30', name: 'NE'},
    {id: '31', name: 'NH'},
    {id: '32', name: 'NJ'},
    {id: '33', name: 'NM'},
    {id: '34', name: 'NV'},
    {id: '35', name: 'NY'},
    {id: '36', name: 'OH'},
    {id: '37', name: 'OK'},
    {id: '38', name: 'OR'},
    {id: '39', name: 'PA'},
    {id: '40', name: 'RI'},
    {id: '41', name: 'SC'},
    {id: '42', name: 'SD'},
    {id: '43', name: 'TN'},
    {id: '44', name: 'TX'},
    {id: '45', name: 'UT'},
    {id: '46', name: 'VA'},
    {id: '47', name: 'VT'},
    {id: '48', name: 'WA'},
    {id: '49', name: 'WI'},
    {id: '50', name: 'WV'},
    {id: '52', name: 'WY'},
  ],
};

export default GlobalVariables;
export const responseType = {
  ACCEPTED: 'accepted',
  EditProfileScreen: 'EditProfileScreen',
};

export const userRoleType = {
  OWNER: 'owner',
  CLIENT: 'client',
  MANAGER: 'manager',
  SUBCONTRACTOR: 'subcontractor',
};

export const optionName = {
  gallery: 'Gallery',
};

export const shareMessage = {
  message: (item, promotion_url) =>
    `Crownstack Texhnologies is running a feed named  "${item}". Please visit for more details ${promotion_url}`,
};

export const shareDetails = {
  message: (item, promotion_url) =>
    `Crownstack Texhnologies is running a feed named  "${item}". Please visit for more details ${promotion_url}`,
};

export const chipStatus ={
  pending: 'pending',
  underReview: 'Under Review' 
}
