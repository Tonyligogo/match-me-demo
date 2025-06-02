"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import MinglerCard from "./components/MinglerCard";

export default function MembersFetch() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["minglers"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/minglers",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: { posts: any[]; nextCursor?: string }) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page: { posts: any[] }) => page.posts) || [];

  if (status === "pending") {
    return <p>Posts loading</p> ;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while fetching members.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5 px-4"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((member) => (
        <MinglerCard
          key={member.id}
          member={member}
          likeIds={[]}
      />
      ))}
      {posts.map((member) => (
        <MinglerCard
          key={member.id}
          member={member}
          likeIds={[]}
      />
      ))}
      {posts.map((member) => (
        <MinglerCard
          key={member.id}
          member={member}
          likeIds={[]}
      />
      ))}
      {posts.map((member) => (
        <MinglerCard
          key={member.id}
          member={member}
          likeIds={[]}
      />
      ))}
      {isFetchingNextPage && <p>Loading..</p>}
    </InfiniteScrollContainer>
  );
}