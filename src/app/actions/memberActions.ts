'use server';

import { prisma } from '@/lib/prisma';
import { Member, Photo } from '@prisma/client';
import { addYears } from 'date-fns';
import { getAuthUserId } from './authActions';
import { GetMemberParams, PaginatedResponse } from '@/types';

function getAgeRange(ageRange: string): Date[] {
    const [minAge, maxAge] = ageRange.split(',');
    const currentDate = new Date();
    const minDob = addYears(currentDate, -maxAge - 1);
    const maxDob = addYears(currentDate, -minAge);

    return [minDob, maxDob];
}
type ZodiacSign = 
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

// Update the zodiacCompatibility object to use the ZodiacSign type
const zodiacCompatibility: Record<ZodiacSign, ZodiacSign[]> = {
  Aries: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
  Taurus: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
  Gemini: ['Aries', 'Leo', 'Libra', 'Aquarius'],
  Cancer: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
  Leo: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
  Virgo: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
  Libra: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
  Scorpio: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
  Sagittarius: ['Aries', 'Leo', 'Libra', 'Aquarius'],
  Capricorn: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
  Aquarius: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
  Pisces: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
};

export async function getMembers({
    ageRange = '18,100',
    gender = 'male,female',
    orderBy = 'updated',
    pageNumber = '1',
    pageSize = '12',
    withPhoto = 'true',
    zodiacSign
}: GetMemberParams): Promise<PaginatedResponse<Member>> {
    const userId = await getAuthUserId();

    const [minDob, maxDob] = getAgeRange(ageRange);

    const selectedGender = gender.split(',');
    // Get compatible zodiac signs
    const compatibleZodiacSigns = (zodiacSign && zodiacCompatibility[zodiacSign as ZodiacSign]) || [];

    const page = parseInt(pageNumber);
    const limit = parseInt(pageSize);

    const skip = (page - 1) * limit;

    let zodiacFilter = {};
if (compatibleZodiacSigns.length > 0) {
    zodiacFilter = { zodiac: { in: compatibleZodiacSigns } };
}

    try {
        const membersSelect = {
            where: {
                AND: [
                    { dateOfBirth: { gte: minDob } },
                    { dateOfBirth: { lte: maxDob } },
                    { gender: { in: selectedGender } },
                    // zodiacFilter,
                    // ...(withPhoto === 'true' ? [{ image: { not: null } }] : [])
                ],
                NOT: {
                    userId
                }
            },
        }

        const count = await prisma.member.count(membersSelect)

        const members = await prisma.member.findMany({
            ...membersSelect,
            orderBy: { [orderBy]: 'desc' },
            skip,
            take: limit
        });

        return {
            items: members,
            totalCount: count
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({ where: { userId } })
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const currentUserId = await getAuthUserId();

    const member = await prisma.member.findUnique({
        where: { userId },
        select: { photos: { where: currentUserId === userId ? {} : { isApproved: true } } }
    });

    if (!member) return null;

    return member.photos.map(p => p) as Photo[];
}

export async function updateLastActive() {
    const userId = await getAuthUserId();

    try {
        return prisma.member.update({
            where: { userId },
            data: { updated: new Date() }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}