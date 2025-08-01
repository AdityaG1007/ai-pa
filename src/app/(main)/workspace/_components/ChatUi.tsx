"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import EmptyChatState from "./EmptyChatState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send } from "lucide-react";
import AiModelOptions from "../../../../../services/AiModelOptions";
import { AssistantContext } from "../../../../../context/AssistantContext";
import axios from "axios";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { AuthContext } from "../../../../../context/AuthContext";
import { ASSISTANT } from "../../ai-assistants/page";

type MESSAGE = {
  role: string;
  content: string;
};

function ChatUi() {
  const [input, setInput] = useState<string>("");
  const { assistant, setAssistant } = useContext(AssistantContext);
  const [messages, setMessages] = useState<MESSAGE[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const {user, setUser} = useContext(AuthContext)
  const UpdateTokens = useMutation(api.users.UpdateTokens)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [assistant?.id]);

  const onSendMessage = async () => {
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
      {
        role: "assistant",
        content: "Loading...",
      },
    ]);

    const userInput = input;
    setInput("");

    const AiModel = AiModelOptions.find(
      (item) => item.name == assistant.aiModelId
    );

    const result = await axios.post("/api/eden-ai-model", {
      provider: AiModel?.edenAi,
      userInput:
        userInput +
        ":" +
        assistant?.instruction +
        ":" +
        assistant?.userInstruction,
      aiResp: messages[messages?.length - 1]?.content,
    });

    setLoading(false);
    setMessages((prev) => prev.slice(0, -1));
    setMessages((prev) => [...prev, result.data]);
    updateUserToken(result.data?.content);
  };

  const updateUserToken = async(resp : string) => {
    const tokenCount = resp.trim() ? resp.trim().split(/\s+/).length : 0;
    console.log(tokenCount);

    const result  =  await UpdateTokens({
      credits : user?.credits - tokenCount,
      uid : user?._id
    })
    setUser((prev : ASSISTANT) => ({
      ...prev,
      credits : user?.credits - tokenCount
    }))
    console.log(result)
  };

  return (
    <div className="mt-20 p-6 relative h-[88vh]">
      {messages?.length == 0 && <EmptyChatState />}

      <div className="h-[75vh] overflow-scroll scrollbar-hidden" ref={chatRef}>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role == "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div className="flex gap-3 ">
              {msg.role == "assistant" && (
                <Image
                  src={assistant?.image}
                  alt="assistant"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
              )}
              <div
                className={`p-3 flex gap-2 rounded-lg
                  ${msg.role == "user" ? "bg-gray-200 text-black rounded-lg " : "bg-gray-50 text-black"}`}
              >
                {loading && messages?.length - 1 == index && (
                  <Loader2Icon className="animate-spin" />
                )}
                <h2>{msg.content}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-5 gap-5 absolute bottom-5 w-[92%]">
        <Input
          placeholder="Start typing here..."
          value={input}
          disabled={loading}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={(e) => e.key == "Enter" && onSendMessage()}
        />
        <Button disabled={loading} onClick={onSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatUi;
