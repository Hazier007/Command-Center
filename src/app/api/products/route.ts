import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const site = searchParams.get('site')
    const status = searchParams.get('status')

    const contentType = searchParams.get('contentType')

    const where: Record<string, string> = {}
    if (site) where.site = site
    if (status) where.status = status
    if (contentType) where.contentType = contentType

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const product = await prisma.product.create({
      data: {
        name: data.name,
        site: data.site,
        category: data.category || '',
        affiliateUrl: data.affiliateUrl || '',
        imageUrl: data.imageUrl || '',
        price: data.price || '',
        status: data.status || 'nieuw',
        keyword: data.keyword || '',
        searchVolume: data.searchVolume || '',
        competition: data.competition || '',
        suggestedTitle: data.suggestedTitle || '',
        metaDescription: data.metaDescription || '',
        seoNotes: data.seoNotes || '',
        description: data.description || '',
        pros: data.pros || '',
        cons: data.cons || '',
        specs: data.specs || '',
        buyerGuide: data.buyerGuide || '',
        assignedTo: data.assignedTo || '',
        notes: data.notes || '',
        contentType: data.contentType || 'product',
        compareItems: data.compareItems || '',
        targetKeyword: data.targetKeyword || '',
        wordCount: data.wordCount || '',
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
