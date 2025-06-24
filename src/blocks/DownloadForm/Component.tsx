'use client'
import type { DownloadFormBlock as DownloadFormBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { CheckCheckIcon, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import SuccessMessage from '@/components/SuccessMessage'
import type { Media } from '@/payload-types'
import Link from 'next/link'

interface DownloadFormData {
  email: string
  firstName: string
  lastName: string
  privacyPolicyAccepted: boolean
}

interface DownloadFormProps
  extends Pick<
    DownloadFormBlockProps,
    | 'fileToDownload'
    | 'emailHeroImage'
    | 'formTitle'
    | 'submitButtonText'
    | 'successMessage'
    | 'documentName'
    | 'introText'
    | 'sourceDocument'
  > {}

const DownloadForm: React.FC<DownloadFormProps> = ({
  fileToDownload,
  emailHeroImage,
  formTitle = 'Download the free PDF now',
  submitButtonText = 'Download',
  successMessage = 'Thank you! Check your email for the download link.',
  documentName = 'Your 2025 e-commerce Playbook',
  introText = 'Thank you for your interest in our latest E-Book on efficient E-Commerce.<br>Discover the best strategies to reduce your shipping costs and returns!',
  sourceDocument,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<DownloadFormData>({ mode: 'onChange' })

  const privacyAccepted = watch('privacyPolicyAccepted')

  const onSubmit = async (data: DownloadFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/download-form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          privacyPolicyAccepted: data.privacyPolicyAccepted,
          fileToDownload: typeof fileToDownload === 'string' ? fileToDownload : fileToDownload.id,
          emailHeroImage: typeof emailHeroImage === 'string' ? emailHeroImage : emailHeroImage.id,
          documentName: documentName,
          introText: introText,
          sourceDocument: sourceDocument,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setHasSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (hasSubmitted) {
    return (
      <div className="bg-background text-foreground p-8 rounded-lg shadow-lg">
        <SuccessMessage>
          <p>{successMessage}</p>
        </SuccessMessage>
      </div>
    )
  }

  return (
    <div>
      {/* <h3 className="text-xl font-semibold mb-6">{formTitle}</h3> */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-600 text-xl">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="mt-1 bg-gray-100 border-0 text-gray-900 placeholder-gray-500 text-xl p-10"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || 'Email cannot be empty or just spaces',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="firstName" className="text-gray-600 text-xl">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First Name"
            className="mt-1 bg-gray-100 border-0 text-gray-900 placeholder-gray-500 text-xl p-10"
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters long',
              },
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || 'First name cannot be empty or just spaces',
                noNumbers: (value) => !/\d/.test(value) || 'First name cannot contain numbers',
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName" className="text-gray-600 text-xl">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="mt-1 bg-gray-100 border-0 text-gray-900 placeholder-gray-500 text-xl p-10"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters long',
              },
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || 'Last name cannot be empty or just spaces',
                noNumbers: (value) => !/\d/.test(value) || 'Last name cannot contain numbers',
              },
            })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacyPolicy"
            checked={privacyAccepted || false}
            onCheckedChange={(checked) => {
              setValue('privacyPolicyAccepted', !!checked, { shouldValidate: true })
            }}
            className="mt-1"
            {...register('privacyPolicyAccepted', {
              required: 'You must agree to the privacy policy',
              validate: {
                mustBeTrue: (value) => value === true || 'You must agree to the privacy policy',
              },
            })}
          />
          <Label htmlFor="privacyPolicy" className="text-lg text-gray-900 leading-relaxed">
            I agree to{' '}
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy policy
            </Link>
          </Label>
        </div>
        {errors.privacyPolicyAccepted && (
          <p className="text-red-500 text-sm">{errors.privacyPolicyAccepted.message}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading || !privacyAccepted || !isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-10 px-6 rounded-lg transition-colors flex items-center justify-center text-2xl"
        >
          {isLoading && <Loader2 className="animate-spin mr-2" size={20} />}
          {isLoading ? 'Processing...' : submitButtonText}
        </Button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </div>
  )
}

export const DownloadFormBlock: React.FC<
  DownloadFormBlockProps & { id?: string; blockType?: 'downloadFormBlock' }
> = ({
  fileToDownload,
  emailHeroImage,
  sectionTitle,
  sectionTitleClasses,
  columnTitle,
  columnTitleClasses,
  listData,
  listItemClasses,
  listTitleClasses,
  endText,
  formTitle,
  submitButtonText,
  successMessage,
  documentName,
  introText,
  sourceDocument,
}) => {
  return (
    <div className={cn('container max-w-screen-2xl py-16')}>
      <h2
        id="downloadForm"
        className={cn(
          typeof sectionTitleClasses === 'object' && sectionTitleClasses?.classes,
          'mb-8',
        )}
      >
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-6">
          <h3
            className={cn(
              typeof columnTitleClasses === 'string' ? '' : columnTitleClasses?.classes,
            )}
          >
            {columnTitle}
          </h3>
          <div className="space-y-8">
            {listData &&
              listData.map((list, index) => (
                <div key={index} className="md:pl-8 lg:pl-12">
                  <div
                    className={cn(
                      typeof listTitleClasses === 'string' ? '' : listTitleClasses?.classes,
                      'mb-4 flex justify-left items-start gap-4',
                    )}
                  >
                    <div className="bg-blue-600">
                      <CheckCheckIcon size={32} className="text-white p-2" />
                    </div>
                    {list.listTitle}
                  </div>
                  {list.listItems?.map((listItem, index) => (
                    <div
                      key={index}
                      className={cn(
                        'mb-4 pl-8 lg:pl-12',
                        typeof listItemClasses === 'string' ? '' : listItemClasses?.classes,
                        'flex justify-left items-start gap-4',
                      )}
                    >
                      <div className="bg-blue-600">
                        <CheckCheckIcon size={28} className="text-white p-2" />
                      </div>
                      <div>{listItem.listItem}</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <p className={cn(typeof listTitleClasses === 'string' ? '' : listTitleClasses?.classes)}>
            {endText}
          </p>
        </div>
        <DownloadForm
          fileToDownload={fileToDownload}
          emailHeroImage={emailHeroImage}
          formTitle={formTitle}
          submitButtonText={submitButtonText}
          successMessage={successMessage}
          documentName={documentName}
          introText={introText}
          sourceDocument={sourceDocument}
        />
      </div>
    </div>
  )
}
