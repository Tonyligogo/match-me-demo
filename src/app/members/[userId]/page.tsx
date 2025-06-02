import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";
import ProfileCard from "./components/ProfileCard";
import { fetchServerCurrentUserLikeIds } from "@/app/actions/likeActions";
import RightSidebar from "./components/RightSidebar";
import { unstable_cache } from "next/cache";

const getLikeIds = unstable_cache(
    async (id) => fetchServerCurrentUserLikeIds(id),
    ['userLikeIds']
  );

export default async function MemberDetailedPage({
  params,
}: {
  params: { userId: string };
}) {
  const member = await getMemberByUserId(
    params.userId
  );
  const photos = await getMemberPhotosByUserId(
      params.userId
    );
   const likeIds = await getLikeIds(params.userId);

  if (!member) return notFound();

  return (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 px-4 my-6 lg:max-w-[90vw] mx-auto">
            <div className="w-full lg:flex-[3]">
            <ProfileCard member={member} likeIds={likeIds} photos={photos}/>
            </div>
            <aside className="lg:flex-1">
              <RightSidebar userId={params.userId}/>
            </aside>
          </div>
  );
}
