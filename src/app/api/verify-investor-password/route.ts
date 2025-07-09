import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { password, fileId, fileName, downloadType } = await request.json()

    if (!password || !fileId || !fileName || !downloadType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Find investor with matching password
    const investors = await payload.find({
      collection: 'investors',
      where: {
        password: {
          equals: password,
        },
      },
      limit: 1,
    })

    if (!investors.docs || investors.docs.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }

    const investor = investors.docs[0]

    // Get the file details
    const file = await payload.findByID({
      collection: 'media',
      id: fileId,
    })

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      )
    }

    // Create download tracking record
    await payload.create({
      collection: 'download-tracking',
      data: {
        investor: investor.id,
        fileName,
        fileId,
        downloadedAt: new Date().toISOString(),
        downloadType,
      },
    })

    // Return success with download URL
    return NextResponse.json({
      success: true,
      downloadUrl: file.url,
      message: `Thank you for downloading ${fileName}!`,
    })
  } catch (error) {
    console.error('Password verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}