import {Icon} from 'atoms/Icon';
import {Touch} from 'atoms/Touch';
import React, {useRef, useState} from 'react';
import {Image} from 'atoms/Image';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {ImagePickerModal} from 'molecules/ImagePickerModal';
import {FC} from 'react';
import {useFormikContext} from 'formik';

type FormImagePickerProps = {
  name: string;
  setImageUrl: any;
};

export const FormImagePicker: FC<FormImagePickerProps> = ({
  name,
  setImageUrl,
  ...props
}) => {
  const sheetRef = useRef(null);
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef?.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef?.current.close();
    }
  };

  const {setFieldValue, getFieldMeta} = useFormikContext();
  const findImage = getFieldMeta(name).value as string;
  const [image, setImage] = useState(findImage || undefined);
  const getImageUrl = (image: any) => {
    const imageUrl = image.path;
    setFieldValue(name, imageUrl);
    setImage(imageUrl);
    setImageUrl(image);
    closeSheet();
  };
  return (
    <Box>
      <Touch onPress={openSheet}>
        {image === undefined ? (
          <Box
            justifyContent="center"
            alignItems="center"
            borderWidth={1}
            borderColor="greyText"
            borderStyle="dashed"
            p="xl">
            <Icon name="add-image" size={35} color="grey" onPress={openSheet} />

            <TextView pt="xs" text="upload.image" color="darkText" />
            <TextView pt="xs" text="image.validation" color="darkText" />
          </Box>
        ) : (
          <Box
            justifyContent="center"
            alignItems="center"
            borderWidth={1}
            borderColor="greyText"
            borderStyle="dashed"
            px="xs"
            py="xs">
            <Image height={130} width={200} source={{uri: image}} />
          </Box>
        )}
      </Touch>

      <ImagePickerModal onClickImage={val => getImageUrl(val)} ref={sheetRef} />
    </Box>
  );
};
