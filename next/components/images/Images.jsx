import styled from "styled-components";
import { useQueryGetImages } from "../../gql/hooks/images";
import { useCloudinaryWidget } from '../../hooks/images';
import { MainButton } from "../../styles/components";
import Image, { ImageContainer } from "./components/Image";

const Images = () => {
  const { showWidget } = useCloudinaryWidget();
  const { data, error, loading } = useQueryGetImages();

  return (
    <Main>
      <div className="header">
        <h1>Hi from the Images page!</h1>
        <MainButton
          onClick={showWidget}
          color="indigo"
          bg="white"
        >
          Upload files
        </MainButton>
      </div>

      <div className="images-container">
        {loading
          ? [1,2,3].map(n => {
            <LazyImage isHeader />
          })
          : data?.images?.map(image => {
            return (
              <Image key={image._id} image={image} />
            )
          })}
      </div>
    </Main>
  )
};

export default Images;

const LazyImage = styled(ImageContainer)`
  background-color: lightgrey;
`;

const Main = styled.main`    
  > .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    
    > h1 {
      margin-right: 16px;
    }
    > button {
      display: inline;
    }
  }

  > .images-container {
    display: flex;
    flex-wrap: wrap;
  }
`;
