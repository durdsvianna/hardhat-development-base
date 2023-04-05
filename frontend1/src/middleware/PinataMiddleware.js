import React, { useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
 

const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MzBlZjNhMy03N2VkLTQxNzEtYmUzNy1kZTM1ODJmMzNiNGIiLCJlbWFpbCI6ImR1cmRzLnZpYW5uYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzViNGM3NWE5MTAxZWYyNTk5N2IiLCJzY29wZWRLZXlTZWNyZXQiOiJlNzQwMGI2NGNlOWQ2ZmIzOWU1NTUzNTQ3ODEzMGJmZjEzYTYwY2EwOTgwMmEwY2ExOTk5YmE3Yjg2NmIxNWYzIiwiaWF0IjoxNjgwMjEwODYxfQ.IupimJof9irUhQn66z8M1HT8hIO8EDzPyN4rXEqXavQ'

export const pinFileToIPFS = async ({file}, fileName,  ) => {
    const formData = new FormData();
    formData.append('file', file)
    
    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': JWT,
          'pinata_api_key': "75b4c75a9101ef25997b",
          'pinata_secret_api_key': "e7400b64ce9d6fb39e55535478130bff13a60ca09802a0ca1999ba7b866b15f3"
        }
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
}

export const uploadToPinata = async (sourceUrl) => {

    const axiosInstance = axios.create();
  
    axiosRetry(axiosInstance, { retries: 5 });
    const data = new FormData();
  
    const response = await axiosInstance(sourceUrl, {
      method: "GET",
      responseType: "stream",
    });
    data.append(`file`, response.data);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxBodyLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': JWT,
            'pinata_api_key': "75b4c75a9101ef25997b",
            'pinata_secret_api_key': "e7400b64ce9d6fb39e55535478130bff13a60ca09802a0ca1999ba7b866b15f3"
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  };
