import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const InputContainer = tw.div`relative py-5 mt-6 w-full`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm w-full`;
const Input = tw.input`w-full`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

export function Transfer({ transferTokens, tokenSymbol }) {
  return (
    <FormContainer>
      <div class="mx-auto max-w-4xl">
        <h3>Transfer</h3>
        <form 
          onSubmit={(event) => {
            // This function just calls the transferTokens callback with the
            // form's data.
            event.preventDefault();

            const formData = new FormData(event.target);
            const to = formData.get("to");
            const amount = formData.get("amount");

            if (to && amount) {
              transferTokens(to, amount);
            }
          }}
        >
          <InputContainer>
            <Label htmlFor="amount-input">Amount of {tokenSymbol}</Label>
            <Input id="amount-input" type="number" name="amount" placeholder="1" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="to-input">Recipient address</Label>
            <Input id="to-input" type="text" name="to" placeholder="to" required />
          </InputContainer>
          <SubmitButton type="submit" value="Tranfer">Transfer</SubmitButton>
        </form>
      </div>
    </FormContainer>       
  );
}
