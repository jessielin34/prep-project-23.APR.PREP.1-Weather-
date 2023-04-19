import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function GetActivity(props) {
  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState();

  const prompt = `What activities can i do in ${props.location} when the temperaute is ${props.temp}?`
  const prompt2 = `what to do when its ${props.weather} in ${props.location} and the temparature is ${props.temp}?`

  async function generateActivity(){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt2,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });  

      console.log(prompt2, response.data.choices[0].text);
      setResult(response.data.choices[0].text)

  } 

  

  return <>
  <button onClick={generateActivity}>click</button>
  <div>
    {result}
    </div>
  </>;
}

export default GetActivity;
