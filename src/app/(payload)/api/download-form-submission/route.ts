import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generateDownloadEmailTemplate } from '@/blocks/DownloadForm/EmailTemplate'
import { getServerSideURL } from '@/utilities/getURL'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    
    const { email, firstName, lastName, fileToDownload, emailHeroImage, privacyPolicyAccepted, sourceDocument, documentName, introText } = body

    // Validate required fields
    if (!email || !firstName || !lastName || !fileToDownload || !emailHeroImage || !privacyPolicyAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get file URLs
    const fileDoc = typeof fileToDownload === 'string' 
      ? await payload.findByID({ collection: 'media', id: fileToDownload })
      : fileToDownload
    
    const heroImageDoc = typeof emailHeroImage === 'string'
      ? await payload.findByID({ collection: 'media', id: emailHeroImage })
      : emailHeroImage

    if (!fileDoc || !heroImageDoc) {
      return NextResponse.json(
        { error: 'File or hero image not found' },
        { status: 404 }
      )
    }

    const serverURL = getServerSideURL()
    const downloadFileUrl = `${serverURL}${fileDoc.url}`
    const emailHeroImageUrl = `${serverURL}${heroImageDoc.url}`

    // Create submission record
    const submission = await payload.create({
      collection: 'download-form-submissions',
      data: {
        email,
        firstName,
        lastName,
        downloadedFile: fileDoc.id,
        emailHeroImage: heroImageDoc.id,
        privacyPolicyAccepted,
        sourceDocument: sourceDocument || 'Unknown',
      },
    })

    // Generate email template
    const emailHTML = generateDownloadEmailTemplate({
      firstName,
      lastName,
      emailHeroImageUrl,
      downloadFileUrl,
      downloadFileName: documentName || fileDoc.filename || 'Your Download',
      introText: introText
    })

    // Send email using Payload's email functionality
    try {
      await payload.sendEmail({
        to: email,
        subject: `Your download is ready, ${firstName}!`,
        html: emailHTML,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully! Check your email for the download link.',
        submissionId: submission.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Download form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}