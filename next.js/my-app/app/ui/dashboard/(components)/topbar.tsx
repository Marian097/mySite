"use client";

import { useEffect } from "react";

import useProfile from "@/app/hooks/useProfile";

import Image from "next/image";
import notificare from "@/public/icons8-notification-64.png";

export default function Topbar() {
  const { profile, error, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  if (error) {
    return <div>Eroare: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex  h-10 md:h-14 lg:h-16 justify-end bg-white">
        <div className="flex items-center">
          <Image className="h-3" src={notificare} alt="" />
        </div>
        <div className="flex gap-x-2 px-3">
          <div className="flex items-center">
            <Image
              className="h-6"
              src={`http://localhost:4000${profile.image}`}
              alt=""
            />
          </div>

          <div className="text-xs flex flex-col justify-center">
            <div>
              <span>{profile.username}</span>
            </div>
            <div>
              <span>{profile.role}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
