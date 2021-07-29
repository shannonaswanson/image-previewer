import React, { useState, useEffect } from 'react';
import uploadImage from './common/upload';
import getImages from './common/getImages';
import Images from './components/imageTiles';
import WrappingContainer from './styledComponents/wrappingContainer';
import UploadContainer from './styledComponents/uploadContainer';
import AppContainer from './styledComponents/appContainer';
import TitleContainer from './styledComponents/titleContainer';
import UploadButton from './components/uploadButton';

const uploadClick = async (file, setImages) => {
  const uploadedFiles = await uploadImage(file);
  setImages(uploadedFiles);
};

export default function Home() {
  const [images, setImages] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(async () => {
    const _images = await getImages() || [];
    setImages(_images);
  }, []);

  const filteredImages = images.filter(image => filterText.length === 0 || image.toLowerCase().indexOf(filterText) > -1);

  return (
    <AppContainer data-testid='home'>
      <UploadContainer>
        <input data-testid='filter-input' type='text' value={filterText} placeholder='Search Images...' onChange={(e) => setFilterText(e.target.value.toLowerCase())} />
        <UploadButton uploadClick={(file) => uploadClick(file, setImages)} accept="image/*" />
      </UploadContainer>

      <TitleContainer data-testid='title-container'>Showing {filteredImages.length} of {images.length} Images</TitleContainer>
      <WrappingContainer>
        <Images images={filteredImages} sourceDirectory='/images' />
      </WrappingContainer>
    </AppContainer>
  )
}
