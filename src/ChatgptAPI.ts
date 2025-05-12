import axios from 'axios';


//sends the prompt to OpenAI's ChatGPT API and returns the response
export async function getChatGPTResponse(prompt: string, apiKey: string) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      //The ChatGPT model being used
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        //Authorizarion with user-provided API key
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  //Return the the response
  return response.data.choices[0].message.content;
}
