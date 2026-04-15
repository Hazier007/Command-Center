import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/clients/[id] – volledige Client record incl. sites.
 * Legacy-IDs (prefix "legacy:") worden niet ondersteund; daarvoor moet je
 * eerst backfillen via POST /api/clients/backfill.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (id.startsWith('legacy:')) {
    return NextResponse.json(
      {
        error:
          'Legacy client-aggregaat heeft geen eigen record. Run /api/clients/backfill om Client-records te maken.',
      },
      { status: 409 }
    )
  }

  try {
    // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        sites: true,
      },
    })

    if (!client) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/clients/[id] – update velden op een Client record.
 * Sync-naar-sites: als `name`, `email`, `contractType`, `contractStart`,
 * `contractEnd` veranderen, werken we ook de gelinkte sites bij zodat
 * de legacy-velden (clientName/clientEmail/contractType/...) synchroon blijven.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (id.startsWith('legacy:')) {
    return NextResponse.json(
      { error: 'Legacy aggregaat niet bewerkbaar; eerst backfillen.' },
      { status: 409 }
    )
  }

  try {
    const body = await request.json()
    const data: Record<string, unknown> = {}

    const stringFields = [
      'name',
      'email',
      'phone',
      'company',
      'vatNumber',
      'address',
      'notes',
      'contractType',
      'paymentStatus',
      'businessUnit',
      'status',
    ] as const
    for (const f of stringFields) {
      if (f in body) data[f] = body[f] || null
    }

    if ('autoRenew' in body) data.autoRenew = body.autoRenew === true
    if ('contractStart' in body) {
      data.contractStart = body.contractStart
        ? new Date(body.contractStart)
        : null
    }
    if ('contractEnd' in body) {
      data.contractEnd = body.contractEnd ? new Date(body.contractEnd) : null
    }

    // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
    const updated = await prisma.client.update({
      where: { id },
      data,
      include: { sites: true },
    })

    // Sync naar legacy site-velden zodat bestaande queries blijven werken
    const syncData: Record<string, unknown> = {}
    if ('name' in body) syncData.clientName = updated.name
    if ('email' in body) syncData.clientEmail = updated.email
    if ('contractType' in body)
      syncData.contractType = updated.contractType
    if ('contractStart' in body)
      syncData.contractStart = updated.contractStart
    if ('contractEnd' in body) syncData.contractEnd = updated.contractEnd

    if (Object.keys(syncData).length > 0) {
      await prisma.site.updateMany({
        // @ts-ignore – clientId veld (schema v2, na db:push beschikbaar)
        where: { clientId: id },
        data: syncData,
      })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/clients/[id]
 * Verwijdert het Client record. Door `onDelete: SetNull` op Site.clientId
 * worden gelinkte sites automatisch losgekoppeld (niet verwijderd).
 * De legacy-velden (clientName etc.) blijven staan als audit trail.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (id.startsWith('legacy:')) {
    return NextResponse.json(
      { error: 'Legacy aggregaat niet verwijderbaar.' },
      { status: 409 }
    )
  }

  try {
    // @ts-ignore – Client model (schema v2, na db:push beschikbaar)
    await prisma.client.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    )
  }
}
