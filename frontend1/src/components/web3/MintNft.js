import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SimpleBackendUploadImage from "components/forms/SimpleBackendUploadImage.js";
import SimpleLoadImage from "components/forms/SimpleLoadImage.js";
import AttributeTable from "components/tables/AttributeTable.js";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"
import {storeNFT} from "middleware/NftStorageMiddleware.js"
import {pinFileToIPFS, uploadToPinata} from "middleware/PinataMiddleware.js"

const Container = tw.div`w-full relative`;
const Content = tw.div`w-full max-w-screen-xl mx-auto py-20 lg:py-24 text-center`;

const FormContainer = styled.div`
  ${tw`w-full p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw` w-full mt-4`}
  }
  h2 {
    ${tw`w-full text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

/* Hero */
const Row = tw.div`flex`;
const HeroRow = tw(Row)`flex-col justify-between items-center px-64 py-8 lg:py-6`;



export function MintNft() {
  const [image , setImage] = useState(null)
  const [url , setUrl] = useState(null)

  const [ nft, setNft] = useState({
    name: '',
    description: '',
    image: '',
    attributes: []
  });
  const [inputFields, setInputFields] = useState([
    { },
  ]);
  
  const updateInputFields = ( inputFields ) => {
    setInputFields(inputFields)
    nft.attributes = inputFields;
  }

  const handleNftName = (e) => {
    nft.name = e.target.value;
  }

  const handleNftDescription = (e) => {
    nft.description = e.target.value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    nft.image = url;
    console.log("InputFields", inputFields);
    console.log("image", image);
    console.log("url", url);
    console.log("nft", nft);

    //armazena imagem IPS
    try {
      const ipfsImageResult = uploadToPinata(nft.image);  
      console.log("ipfsImageResult: ", ipfsImageResult);
    } catch (error) {
      console.log("Erro: ", error);
    }
    
    //realiza o mint da NFT

  };

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Mint your NFT</h2>
            <form action="#">
              <InputContainer>
                <Label htmlFor="name-input">Name</Label>
                <Input id="name-input" type="text" name="name" onChange={handleNftName} placeholder="NFT name" />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="description-input">Description</Label>
                <Input id="description-input" type="text" name="description" onChange={handleNftDescription} placeholder="NFT description" />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="atributesTable-inputs">Attributes</Label>
                <AttributeTable id="atributesTable-inputs" updateInputFields={updateInputFields} />
              </InputContainer>
              <HeroRow></HeroRow>
              <InputContainer>
                <SimpleBackendUploadImage image={image} setImage={setImage} url={url} setUrl={setUrl} />
              </InputContainer>              
              <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
}