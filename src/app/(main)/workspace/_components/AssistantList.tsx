"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ASSISTANT } from "../../ai-assistants/page";
import Image from "next/image";
import { AssistantContext } from "../../../../../context/AssistantContext";
import { BlurFade } from "@/components/magicui/blur-fade";
import AddNewAssistant from "./AddNewAssistant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import Profile from "./Profile";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    user && GetUserAssistants();
  }, [user && assistant == null]);

  const GetUserAssistants = async () => {
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
    setAssistantList(result);
  };

  return (
    <div className="p-5 bg-secondary border-2-[1px] h-screen relative">
      <h2 className="font-bold text-lg">Your Personal AI Assistant</h2>
      <AddNewAssistant>
        <Button className="w-full mt-3">+ Add New Assistant</Button>
      </AddNewAssistant>
      <Input className="bg-white mt-3" placeholder="Search" />

      <div className="mt-5">
        {assistantList.map((assistant_, index) => (
          <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
            <div
              className={`p-2 flex gap-3 items-center hover:bg-gray-400 
                hover:dark:bg-slate-700 rounded-xl cursor-pointer mt-2
              ${assistant_.id == assistant?.id && "bg-gray-200"}`}
              key={index}
              onClick={() => setAssistant(assistant_)}
            >
              <Image
                src={assistant_.image}
                alt={assistant_.name}
                width={60}
                height={60}
                className="rounded-xl w-[60px] h-[60px] object-cover p"
              />
              <div>
                <h2 className="font-bold ">{assistant_.name}</h2>
                <h2 className="text-gray-600 text-sm dark:text-gray-300">
                  {assistant_.title}
                </h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="absolute bottom-10 flex gap-3 items-center 
        hover:bg-gray-200 w-[87%] p-2 rounded-xl cursor-pointer"
          >
            <Image
              src={user?.picture}
              alt="user"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div>
              <h2 className="font-bold">{user?.name}</h2>
              <h2 className="text-gray-400">
                {user?.orderId ? "Pro Plan" : "Free Plan"}
              </h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenProfile(true)}><UserCircle2/>Profile</DropdownMenuItem>
          <DropdownMenuItem><LogOut/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Profile openDialog = {openProfile} setOpenDialog={setOpenProfile} />
    </div>
  );
}

export default AssistantList;
