import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { addYears } from 'date-fns';
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // This route should not be cached

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


export async function GET(request: NextRequest) {
  try {
    const cursor = request.nextUrl.searchParams.get("cursor") || undefined;
    const { searchParams } = new URL(request.url);

    const ageRange = searchParams.get('ageRange') || '18,100';
    const gender = searchParams.get('gender') || 'male,female';
    const withPhoto = searchParams.get('withPhoto') || 'true';
    const zodiacSign = searchParams.get('zodiacSign') as ZodiacSign | undefined;

    const pageSize = 10;

    const session = await auth();
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [minDob, maxDob] = getAgeRange(ageRange);

    const selectedGender = gender.split(',');

    const compatibleZodiacSigns = (zodiacSign && zodiacCompatibility[zodiacSign]) || [];
    let zodiacFilter = {};
    if (compatibleZodiacSigns.length > 0) {
      zodiacFilter = { zodiac: { in: compatibleZodiacSigns } };
    }

    // 3. Construct the Prisma query
    const membersSelectArgs = {
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          zodiacFilter,
          ...(withPhoto === 'true' ? [{ image: { not: null } }] : [])
        ],
        NOT: {
          userId
        }
      },
    };

    const [count, members] = await prisma.$transaction([
      prisma.member.count(membersSelectArgs),
      prisma.member.findMany({
        ...membersSelectArgs,
        orderBy: { created: 'desc' },
        take: pageSize + 1,
        cursor: cursor ? { id: cursor } : undefined,
        // select: { id: true, userId: true, gender: true, image: true, /* ... */ },
      }),
    ]);
    const nextCursor = members.length > pageSize ? members[pageSize].id : null;
    const data = {
        posts: members.slice(0, pageSize), // Return only the first pageSize items
        nextCursor: nextCursor || null,
        totalCount: count
    }
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in GET /api/members:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}