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
  ["my-matches"]
);

export default async function MembersPage() {
  const userId = await getAuthUserId();
  const matches = await getMatches(userId);

  if (matches.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-grow overflow-auto mt-5 gap-5 flex-col justify-between">
      <h1 className="px-4 font-semibold text-2xl text-primaryBlue">My Stars</h1>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {matches.length > 0 ? (
          matches.map((member) => (
            <MemberCard key={member.id} member={member} likeIds={[]} />
          ))
        ) : (
          <div>You have no matches yet.</div>
        )}
      </div>
    </div>
  );
}
