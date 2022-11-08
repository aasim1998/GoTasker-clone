import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {FormTextInput} from 'molecules/FormTextInput';
import {Formik, FormikHelpers} from 'formik';
import {PressEvent} from 'typings/utils';
import {Button} from 'molecules/Button';
import {addFeedType} from 'typings/addFeed.type';
import {
  validateEndDateRequired,
  validateStartDateRequired,
  validateSummaryRequired,
  validateTitleRequired,
  validateUploadImageRequired,
  validateUrlRequired,
} from 'utils/validators';
import * as yup from 'yup';
import {TextView} from 'atoms/TextView';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {Row} from 'atoms/Row';
import {ScrollView} from 'react-native-gesture-handler';
import {Touch} from 'atoms/Touch';
import {deviceHeight, isIOS} from 'utils/device';
import GlobalVariables from 'utils/constant';
import {FormImagePicker} from 'molecules/FormImagePicker/FormImagePicker';
import {Text} from 'atoms/Text';
import {EditFeedsDateInput} from 'molecules/EditFeedsDateInput';

type FormValues = {
  feedTitle: string;
  feedSummary: string;
  feedUrl: string;
  feedCategory: string;
  startDate: string;
  endDate: string;
  uploadImage: any;
};

const addFeedSchema = yup.object().shape({
  feedTitle: validateTitleRequired(),
  feedSummary: validateSummaryRequired(),
  feedUrl: validateUrlRequired(),
  startDate: validateStartDateRequired(),
  endDate: validateEndDateRequired(),
  uploadImage: validateUploadImageRequired(),
});

type AddFeedFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addFeedType;
};

export const EditFeedsForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddFeedFormProps) => {
  const [descriptionCount, setDescriptionCount] = useState('');
  const [isValue, setIsValue] = useState('https://');
  const [imageUrl, setImageUrl] = useState('');
  const [isExecute, setExecute] = useState(false);

  return (
    <ScrollView>
      <Box>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={addFeedSchema}
          enableReinitialize
          onSubmit={onSubmit}>
          {({setFieldValue, handleSubmit}) => {
            return (
              <Box mt={deviceHeight < 780 ? 'xs' : 'xl'}>
                <TextView
                  mt="-s"
                  pb="s"
                  fontSize={16}
                  text="feed.Title"
                  color="zBlack"
                />
                <FormTextInput
                  name="feedTitle"
                  placeholder="placeholder.title"
                  textAlignVertical="top"
                  autoCapitalize="sentences"
                  borderRadius={6}
                  height={45}
                  color="black"
                />
                <TextView
                  mt="xxs"
                  pb="s"
                  fontSize={16}
                  text="feed.Summary"
                  color="zBlack"
                />
                <FormTextInput
                  onChangeText={value => {
                    setDescriptionCount(value);
                    setFieldValue('feedSummary', value);
                  }}
                  maxLength={140}
                  name="feedSummary"
                  placeholder="placeholder.summry"
                  multiline
                  height={125}
                  autoCapitalize="sentences"
                  textAlignVertical="top"
                  borderRadius={6}
                  color="black"
                  value={descriptionCount}
                />
                <Box top={3} flexDirection="row-reverse" mt="-l">
                  <Row>
                    <Text color="zBlack">
                      {''}
                      {descriptionCount.length}
                    </Text>
                    <TextView text="character.limit" color="zBlack" />
                  </Row>
                </Box>

                <TextView
                  mt="xxl"
                  pb="s"
                  fontSize={16}
                  text="feed.url"
                  color="zBlack"
                />
                <FormTextInput
                  onChangeText={value => {
                    setIsValue(value);
                    setFieldValue('feedUrl', value);
                  }}
                  name="feedUrl"
                  textAlignVertical="top"
                  borderRadius={6}
                  height={45}
                  color="black"
                  value={isValue}
                />

                <TextView
                  mt="xxs"
                  pb="s"
                  fontSize={16}
                  text="feed.category"
                  color="zBlack"
                />
                <FormSelectInput
                  name="feedCategory"
                  options={GlobalVariables.categoryList}
                  handleOnChange={val =>
                    setFieldValue('feedCategory', val.name)
                  }
                />

                <TextView
                  mt="-m"
                  pb="s"
                  fontSize={16}
                  text="date.text"
                  color="zBlack"
                />
                <EditFeedsDateInput />

                <TextView
                  mt="xxs"
                  pb="s"
                  fontSize={16}
                  text="upload.image"
                  color="zBlack"
                />

                <FormImagePicker
                  name="uploadImage"
                  setImageUrl={val => setImageUrl(val)}
                />

                {isExecute && !imageUrl && (
                  <TextView
                    text="upload.image.feed"
                    color="error"
                    mt="s"
                    fontSize={12}
                  />
                )}

                <Row
                  mt="xl"
                  borderWidth={0.5}
                  borderRadius={18}
                  height={36}
                  borderColor="greyText"
                  borderStyle="solid">
                  <TextView
                    fontSize={15}
                    pt="s"
                    ml="s"
                    text="status.text"
                    color="darkText"
                  />
                  <TextView
                    mt="s"
                    ml="xs"
                    text="status.feed"
                    color="lightingYellow"
                    fontWeight="bold"
                    fontSize={15}
                  />
                </Row>

                <Box mt="xl" mb="m">
                  <Touch>
                    <Button
                      loading={loading}
                      onPress={() => {
                        setExecute(true);
                        handleSubmit() as PressEvent;
                      }}
                      title="title.edit.feed"
                      variant={isIOS ? 'primary-bold' : 'primary-large'}
                      backgroundColor="lightingYellow"
                      borderColor="lightingYellow"
                    />
                  </Touch>
                </Box>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};
