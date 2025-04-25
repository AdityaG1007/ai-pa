import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { provider, userInput, aiResp } = await req.json();

  const headers = { Authorization: "Bearer " + process.env.EDEN_AI_API_KEY ,
    'Content-Type': 'application/json'
  };
  const url = "https://api.edenai.run/v2/llm/chat";
  const body = JSON.stringify({
    model: provider,
    messages: [
        {
            role : "user",
            content : userInput,
        },
        ...(aiResp ? [{
          role : "assistant",
          content : aiResp,
        }] : []),
    ],
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const result = await response.json();
  console.log(result);

  const resp = {
    role : 'assistant',
    content :  result?.choices?.[0]?.message?.content,
  }

  return NextResponse.json(resp)
}
