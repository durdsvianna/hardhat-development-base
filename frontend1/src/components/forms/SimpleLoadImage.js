import { React, useState } from "react";
import Form from '../images/Form'
import Pending from '../images/Pending'
import SimpleLoaded from '../images/SimpleLoaded';

export default ({image, setImage}) => {
  const [isPending , setIsPending] = useState(false)  
  const [url , setUrl] = useState(null)
  const [error , setError] = useState(false)

  return (    
              <div className="w-full h-screen bg-grey flex justify-center items-center">
                  {
                    error ? 
                      <p className='text-red-600 text-center border-red-600 rounded-lg border-2 bg-red-300 px-4 py-2'>internal server error , Refresh the page and try again</p> :
                    isPending ? 
                      <Pending/> : image 
                    ? <SimpleLoaded image={image} /> : <Form image={image} setImage={setImage} setIsPending={setIsPending} setUrl={setUrl} setError={setError}/>
                  }        
              </div>              
  );
};
