import React from 'react'
import Image from "next/image"
import dashstack from "@/public/DashStack.png"

export default function sidebar() {
  return (
    <div className="h-screen bg-white">
      <div className = "flex justify-center">
        <Image className="h-20 w-auto" src={dashstack} alt="" />
      </div>

      <div className="flex flex-col py-5 gap-y-4 text-xs font-bold font-nunito items-center">
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Dashboard</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Documents</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Profiles</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Payments</span>
        </div>
         <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Messages</span>
        </div>
      </div>
    </div>
  );
}
