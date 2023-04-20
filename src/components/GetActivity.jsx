import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./activity.css";
import Loading from "./Loading/Loading";

function GetActivity(props) {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const prompt = `suggest activities when it's ${props.weather} and the temperature is ${props.temp} C in ${props.location}`;

  async function generateActivity() {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setLoading(false);
    setResult(response.data.choices[0].text);
  }

  useEffect(() => {
    generateActivity();
  }, [prompt]);

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
