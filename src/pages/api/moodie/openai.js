import { Configuration, OpenAIApi } from "openai-edge";
import OpenAI from "openai";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { mood } = req.body;

//     const configuration = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     try {
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: `Movie recommendation according to user's mood: ${mood}`,
//         temperature: 0.7,
//         max_tokens: 150,
//         top_p: 1.0,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0,
//       });

//       res
//         .status(200)
//         .json({ success: true, data: response.data.choices[0].text });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// const USER_PROMPT = 'mood'
// const SYSTEM_PROMPT = 'Movie recommendation according to user mood'
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// export const runtime = 'edge'
// export async function POST(req: Request) {
//     const { url, img } = await req.json()
//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         stream: true,
//         max_tokens: 4096,
//         messages: [
//             {
//                 role: 'system',
//                 content: SYSTEM_PROMPT,
//             },
//             {
//                 role: 'user',
//                 content: [
//                     {
//                         type: 'text',
//                         text: USER_PROMPT,
//                     },

//                 ],
//             },
//         ],
//     })
//     const stream = OpenAIStream(response)
//     return new StreamingTextResponse(stream)
// }
