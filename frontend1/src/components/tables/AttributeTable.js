import React, { useState } from "react";
import tw from "twin.macro";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const InputContainer = tw.div`flex py-5 mt-6`;
const Input = tw.input`mr-4`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

export default function AttributeTable ({updateInputFields}) {

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), attributeName: '', attributeValue: '' },
  ]);

  

  const handleChangeInput = (id, event) => {
    updateInputFields([ ...inputFields ])
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setInputFields(newInputFields);    
  }

  const handleAddFields = () => {
    updateInputFields([ ...inputFields ])
    setInputFields( [...inputFields, { id: uuidv4(),  attributeName: '', attributeValue: '' }] )    
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (    
    <>              
        { inputFields.map(inputField => (        
          <InputContainer key={inputField.id}>            
            <Input 
              name="attributeName"
              placeholder="Attribute Name"
              variant="filled"
              value={inputField.attributeName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <Input
              name="attributeValue"
              placeholder="Attribute Value"
              variant="filled"
              value={inputField.attributeValue}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </InputContainer>
        )) }      
    </>             
  );
}
