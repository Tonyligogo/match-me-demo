import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchMutualLikes } from "../actions/likeActions";
import PaginationComponent from "@/components/PaginationComponent";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";
import { unstable_cache } from "next/cache";
import { getAuthUserId } from "../actions/authActions";

const getMatches = unstable_cache(
    async (userId) => fetchMutualLikes(userId),
    ['my-matches']
  );

export default async function MembersPage() {
  const userId = await getAuthUserId();
  const matches = await getMatches(userId);

  if (matches.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-grow h-full flex-col justify-between">
      <div className="mt-10 px-4 grid h-[380px] md:h-[295px] grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* {matches &&
          matches.map((match) => (
            <MemberCard
              member={match}
              key={match.id}
              likeIds={[]}
            />
        ))} */}
      </div>
    </div>
  );
}
