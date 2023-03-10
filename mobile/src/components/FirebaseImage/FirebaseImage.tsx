import React, { useEffect, useState } from 'react';
import { StyleProp } from 'react-native';

import {
  getStorage,
  ref,
  getDownloadURL,
  updateMetadata,
} from 'firebase/storage';
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image';

interface Props extends FastImageProps {
  style?: StyleProp<ImageStyle>;
  name?: string;
  container?: string;
  url?: string;

  onDownload?: (url: string) => void;
}

const FirebaseImage: React.FC<Props> = props => {
  const { name, url, container, style, onDownload, ...rest } = props;

  const [imageURL, setImageURL] = useState<string>('');

  useEffect(() => {
    const storage = getStorage();

    const gsReference = ref(
      storage,
      url ? url : `gs://mangashow-b8f81.appspot.com/${container}/${name}.webp`,
    );

    const newMetadata = {
      cacheControl: 'public,max-age=4000',
      contentType: 'image/webp',
    };

    updateMetadata(gsReference, newMetadata).then(() => {
      getDownloadURL(gsReference).then(url => {
        setImageURL(url);

        if (onDownload) {
          onDownload(url);
        }
      });
    });
  }, []);

  return <FastImage style={style} source={{ uri: imageURL }} {...rest} />;
};

export default FirebaseImage;
