import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./activity.css";
import Loading from "./Loading/Loading";

function GetActivity(props) {
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const prompt = `What activities can i do in ${props.location} when the temperaute is ${props.temp}?`;
  const prompt2 = `what to do when its ${props.weather} in ${props.location} and the temparature is ${props.temp}?`;

  async function generateActivity() {
    setLoading(true);
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
    setLoading(false);
    setResult(response.data.choices[0].text);
  }

  useEffect(() => {
    generateActivity();
  }, [prompt2]);

  return (
    <>
      {/* <button onClick={generateActivity}>click</button> */}
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="activity">
            <div>{result}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default GetActivity;
