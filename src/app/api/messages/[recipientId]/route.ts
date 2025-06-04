// app/api/messages/[recipientId]/route.ts

import { getAuthUserId } from '@/app/actions/authActions';
import { mapMessageToMessageDto } from '@/lib/mappings';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { createChatId } from '@/lib/util';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    recipientId: string;
}

// GET /api/messages/[recipientId]
export async function GET(
    request: NextRequest,
    { params }: { params: Params } // Next.js automatically provides params for dynamic routes
) {
    try {
        const { recipientId } = params;

        if (!recipientId) {
            return NextResponse.json({ error: 'Recipient ID is required' }, { status: 400 });
        }

        const userId = await getAuthUserId(); // Ensure this function correctly gets the authenticated user's ID
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        recipientId: recipientId,
                        senderDeleted: false
                    },
                    {
                        senderId: recipientId,
                        recipientId: userId,
                        recipientDeleted: false
                    }
                ]
            },
            orderBy: {
                created: 'asc'
            },
            select: messageSelect // Ensure messageSelect is correctly defined
        });

        let readCount = 0;

        if (messages.length > 0) {
            const unreadMessageIds = messages
                .filter(m => m.dateRead === null
                    && m.recipient?.userId === userId // Ensure 'recipient' and 'sender' relations are included in messageSelect if needed
                    && m.sender?.userId === recipientId)
                .map(m => m.id);

            // Update messages as read
            await prisma.message.updateMany({
                where: {
                    senderId: recipientId,
                    recipientId: userId,
                    dateRead: null
                },
                data: { dateRead: new Date() }
            });

            readCount = unreadMessageIds.length;

            // Trigger Pusher event
            await pusherServer.trigger(createChatId(recipientId, userId), 'messages:read', unreadMessageIds);
        }

        // Return the messages and readCount as JSON
        return NextResponse.json({
            messages: messages.map(message => mapMessageToMessageDto(message)),
            readCount
        });

    } catch (error) {
        console.error('Error fetching message thread:', error); // Use console.error for errors
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

const messageSelect = {
    id: true,
    text: true,
    created: true,
    dateRead: true,
    sender: {
        select: {
            userId: true,
            name: true,
            image: true
        }
    },
    recipient: {
        select: {
            userId: true,
            name: true,
            image: true
        }
    }
}