'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/cn'
import { Loader2 } from 'lucide-react'
import SuccessMessage from '@/components/SuccessMessage'
import { Media } from '@/payload-types'
import SpecialConfirmation, {
  SpecialConfirmationProps,
} from '@/components/SpacialConfirmationMessage'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
    root: {
      type: string
      children: { [k: string]: unknown; type: string; version: number }[]
      direction: 'ltr' | 'rtl' | null
      format: '' | 'start' | 'center' | 'end' | 'left' | 'right' | 'justify'
      indent: number
      version: number
    }
  } | null
  fileToDownload?: string | Media
  disappearingIntroOnSubmit?: boolean
}

export const FormBlock: React.FC<
  {
    id?: string
    hideLabels?: boolean
    submitClasses?: string
    className?: string
    specialConfirmation?: boolean
    specialConfirmationData?: SpecialConfirmationProps
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    submitClasses,
    className,
    fileToDownload,
    specialConfirmation = false,
    specialConfirmationData,
    disappearingIntroOnSubmit = true,
  } = props

  console.log('introContent', introContent)
  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className={className}>
      {enableIntro && introContent && !hasSubmitted && !disappearingIntroOnSubmit && (
        <RichText className="mb-8 lg:mb-12" content={introContent} enableGutter={false} />
      )}
      <div>
        <FormProvider {...formMethods}>
          {specialConfirmation && specialConfirmationData && !isLoading && hasSubmitted && (
            <SpecialConfirmation {...specialConfirmationData} />
          )}
          {!specialConfirmation && !isLoading && hasSubmitted && confirmationType === 'message' && (
            <SuccessMessage>
              <RichText content={confirmationMessage} className="text-center" />
            </SuccessMessage>
          )}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              {disappearingIntroOnSubmit && introContent && (
                <RichText
                  className="mb-8 lg:mb-12 w-full"
                  content={introContent}
                  enableGutter={false}
                />
              )}
              <div className="mb-4 last:mb-0 grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          hideLabels={props.hideLabels}
                          key={index}
                          className="mb-6 last:mb-0"
                        />
                      )
                    }
                    return null
                  })}
              </div>
              <div className="flex flex-col">
                <Button
                  form={formID}
                  type="submit"
                  variant="default"
                  className={cn(submitClasses)}
                  disabled={isLoading}
                >
                  {isLoading && !hasSubmitted && <Loader2 className="animate-spin duration-500" />}{' '}
                  {isLoading ? 'Loading ...' : submitButtonLabel}
                </Button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
