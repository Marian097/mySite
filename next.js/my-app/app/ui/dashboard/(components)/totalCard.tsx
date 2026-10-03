import React from "react";
import Image from "next/image";
import users from "@/public/Total_users.png";
import type { Count } from "@/app/lib/definitions"

export default function TotalCard( workers: Count) {
  
  return (
    <div className=" rounded-md h-full">
      <div className="ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className="font-nunito font-semibold text-xs">
                Profiles
              </span>
            </div>
            <div>
              <span className="font-nunito font-bold">{workers.total ?? 0}</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <Image src={users} alt="" className="h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
