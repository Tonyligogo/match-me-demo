'use server';

import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';
import { pusherServer } from '@/lib/pusher';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthUserId();

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            const like = await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                },
                select: {
                    sourceMember: {
                        select: {
                            name: true,
                            image: true,
                            userId: true
                        }
                    }
                }
            });

            await pusherServer.trigger(`private-${targetUserId}`, 'like:new', {
                name: like.sourceMember.name,
                image: like.sourceMember.image,
                userId: like.sourceMember.userId
            })
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthUserId();

        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })

        return likeIds.map(like => like.targetUserId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchServerCurrentUserLikeIds(userId: string) {
    try {

        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })

        return likeIds.map(like => like.targetUserId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: { sourceUserId: userId },
        select: { targetMember: true }
    })
    return sourceList.map(x => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: { targetUserId: userId },
        select: { sourceMember: true }
    })
    return targetList.map(x => x.sourceMember);
}

export async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.like.findMany({
        where: { sourceUserId: userId },
        select: { targetUserId: true }
    });
    const likedIds = likedUsers.map(x => x.targetUserId);

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                { targetUserId: userId },
                { sourceUserId: { in: likedIds } }
            ]
        },
        select: { sourceMember: true }
    });
    return mutualList.map(x => x.sourceMember);
}

// fetching non-mutual likes (you have not liked back). These act as suggestions
export async function fetchUnreciprocatedLikes(userId: string) {
    // 1. Get IDs of all users whom the current user (userId) has liked.
    // This is the same as your first query for mutual likes.
    const usersLikedByMe = await prisma.like.findMany({
        where: { sourceUserId: userId },
        select: { targetUserId: true }
    });
    const likedByMeIds = usersLikedByMe.map(x => x.targetUserId);

    // 2. Find likes where the current user (userId) is the target (i.e., someone liked me).
    // We also need to include the sourceUser (the person who liked me).
    const likedMeList = await prisma.like.findMany({
        where: {
            targetUserId: userId
        },
        select: { sourceUserId: true, sourceMember: true }
    });

    // 3. Filter out those whom the current user has already liked back.
    // We iterate through the people who liked me and keep only those whose IDs
    // are NOT in the 'likedByMeIds' list.
    const unreciprocatedLikes = likedMeList.filter(likedMe =>
        !likedByMeIds.includes(likedMe.sourceUserId)
    );

    return unreciprocatedLikes.map(x => x.sourceMember);
}