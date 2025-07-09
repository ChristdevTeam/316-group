'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { cn } from '@/utilities/cn'
import { Calendar, ChevronDown, ChevronUp, Download, FileDown, Table } from 'lucide-react'
import type { InvestorRelationsBlock as InvestorRelationsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

interface PasswordDialogProps {
  onPasswordSubmit: (password: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  onPasswordSubmit,
  isOpen,
  onOpenChange,
}) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      toast.error('Please enter a password')
      return
    }

    setIsLoading(true)
    try {
      await onPasswordSubmit(password)
      setPassword('')
      onOpenChange(false)
    } catch (error) {
      console.error('Password submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Password to Download</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Download'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const InvestorRelationsBlock: React.FC<
  InvestorRelationsBlockProps & { id?: string; blockType?: 'investorRelations' }
> = ({
  presentationsTitle,
  presentationsDescription,
  presentations,
  reportsTitle,
  reportsDescription,
  reports,
  financialsMainTitle,
  financialsFurtherInfo,
  showFinancialsDetails,
  investorRelationsCalendar,
  financialResults,
  financialRatios,
}) => {
  const [showDetails, setShowDetails] = useState(showFinancialsDetails || false)
  const [passwordDialog, setPasswordDialog] = useState<{
    isOpen: boolean
    fileId: string
    fileName: string
    downloadType: string
  }>({ isOpen: false, fileId: '', fileName: '', downloadType: '' })

  // State for Financial Results table
  const [financialResultsSort, setFinancialResultsSort] = useState<'asc' | 'desc'>('desc')
  const [financialResultsYear, setFinancialResultsYear] = useState<string>('all')

  // State for Financial Ratios table
  const [financialRatiosSort, setFinancialRatiosSort] = useState<'asc' | 'desc'>('desc')
  const [financialRatiosYear, setFinancialRatiosYear] = useState<string>('all')

  // State for IR Calendar
  const [irCalendarView, setIrCalendarView] = useState<'table' | 'calendar'>('table')
  const [irCalendarSort, setIrCalendarSort] = useState<'asc' | 'desc'>('desc')
  const [irCalendarYear, setIrCalendarYear] = useState<string>('all')

  // State for calendar navigation
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())

  const handleDownloadRequest = (fileId: string, fileName: string, downloadType: string) => {
    setPasswordDialog({
      isOpen: true,
      fileId,
      fileName,
      downloadType,
    })
  }

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await fetch('/api/verify-investor-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          fileId: passwordDialog.fileId,
          fileName: passwordDialog.fileName,
          downloadType: passwordDialog.downloadType,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Create download link and trigger download
        const downloadLink = document.createElement('a')
        downloadLink.href = result.downloadUrl
        downloadLink.download = passwordDialog.fileName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        toast.success(`Thank you for downloading ${passwordDialog.fileName}!`)
      } else {
        toast.error(result.message || 'Invalid password. Please try again.')
        throw new Error('Invalid password')
      }
    } catch (error) {
      console.error('Download error:', error)
      throw error
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Helper functions for table functionality
  const getAvailableYears = (items: any[]) => {
    const years = items
      .filter((item) => item.date)
      .map((item) => new Date(item.date).getFullYear())
      .filter((year, index, arr) => arr.indexOf(year) === index)
      .sort((a, b) => b - a)
    return years
  }

  const filterAndSortItems = (items: any[], year: string, sortOrder: 'asc' | 'desc') => {
    let filtered = items
    if (year !== 'all') {
      filtered = items.filter(
        (item) => item.date && new Date(item.date).getFullYear().toString() === year,
      )
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || 0)
      const dateB = new Date(b.date || 0)
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  }

  // Get available years for dropdowns
  const financialResultsYears = financialResults ? getAvailableYears(financialResults) : []
  const financialRatiosYears = financialRatios ? getAvailableYears(financialRatios) : []
  const irCalendarYears = investorRelationsCalendar
    ? getAvailableYears(investorRelationsCalendar)
    : []

  // Get filtered and sorted data
  const sortedFinancialResults = financialResults
    ? filterAndSortItems(financialResults, financialResultsYear, financialResultsSort)
    : []
  const sortedFinancialRatios = financialRatios
    ? filterAndSortItems(financialRatios, financialRatiosYear, financialRatiosSort)
    : []
  const sortedIrCalendar = investorRelationsCalendar
    ? filterAndSortItems(investorRelationsCalendar, irCalendarYear, irCalendarSort)
    : []

  // Calendar navigation functions
  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (calendarMonth === 0) {
        setCalendarMonth(11)
        setCalendarYear(calendarYear - 1)
      } else {
        setCalendarMonth(calendarMonth - 1)
      }
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0)
        setCalendarYear(calendarYear + 1)
      } else {
        setCalendarMonth(calendarMonth + 1)
      }
    }
  }

  // Get available months with events
  const getAvailableMonths = () => {
    if (!investorRelationsCalendar) return new Set()
    const months = new Set<string>()
    investorRelationsCalendar.forEach((item) => {
      if (item.date) {
        const date = new Date(item.date)
        months.add(`${date.getFullYear()}-${date.getMonth()}`)
      }
    })
    return months
  }

  const availableMonths = getAvailableMonths()
  const currentMonthKey = `${calendarYear}-${calendarMonth}`
  const hasEventsInCurrentMonth = availableMonths.has(currentMonthKey)

  // Calendar component for IR Calendar
  const CalendarView = () => {
    // Group events by date (use all events, not just sorted/filtered ones for calendar view)
    const allEvents = investorRelationsCalendar || []
    const eventsByDate = allEvents.reduce(
      (acc, item) => {
        const date = new Date(item.date).toDateString()
        if (!acc[date]) acc[date] = []
        acc[date].push(item)
        return acc
      },
      {} as Record<string, typeof allEvents>,
    )

    // Get calendar days for selected month
    const firstDay = new Date(calendarYear, calendarMonth, 1)
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const calendarDays: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day)
    }

    return (
      <div className="bg-white text-black rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigateCalendar('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h4 className="text-lg font-semibold text-center">
            {new Date(calendarYear, calendarMonth).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h4>

          <button
            onClick={() => navigateCalendar('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {!hasEventsInCurrentMonth && (
          <div className="text-center text-gray-500 mb-4 p-4 bg-gray-50 rounded-lg">
            No events found for this month
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={`${day}-${index}`} className="p-2 text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={`${index}-${day}`} className="p-2 h-20"></div>
            }

            const dateStr = new Date(calendarYear, calendarMonth, day).toDateString()
            const dayEvents = eventsByDate[dateStr] || []

            return (
              <div key={`${index}-${day}`} className="p-1 h-20 border border-gray-200 relative">
                <div className="text-sm font-medium text-center">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="mt-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded mb-1 truncate cursor-pointer hover:bg-blue-200"
                        title={event.title}
                        onClick={() => {
                          if (event.file && typeof event.file === 'object') {
                            const file = event.file as NonNullable<typeof event.file>
                            handleDownloadRequest(
                              file.id || '',
                              file.filename || event.title || 'IR Calendar Item',
                              'ir-calendar',
                            )
                          }
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-600 text-white min-h-screen py-8 md:py-16">
      {/* Presentations Section */}
      <section className="py-4 md:py-8">
        <div className="container max-w-screen-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{presentationsTitle}</h2>
          {presentationsDescription && (
            <p className="text-base md:text-lg mb-8 md:mb-12 max-w-3xl">
              {presentationsDescription}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {presentations?.map((presentation, index) => (
              <div key={index} className="group cursor-pointer">
                {presentation.image && typeof presentation.image === 'object' && (
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={presentation.image.url || ''}
                      alt={presentation.image.alt || presentation.title || ''}
                      width={400}
                      height={250}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-lg md:text-xl font-semibold mb-2">{presentation.title}</h3>
                {presentation.date && (
                  <p className="text-blue-200 mb-4 text-sm md:text-base">
                    {formatDate(presentation.date)}
                  </p>
                )}
                {presentation.link && (
                  <CMSLink
                    {...presentation.link}
                    appearance="link"
                    className="inline-flex items-center text-white hover:text-blue-200 transition-colors text-sm md:text-base"
                  >
                    {/* {presentation.link.label || 'Learn More'} */}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </CMSLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-4 md:py-8">
        <div className="container max-w-screen-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{reportsTitle}</h2>
          {reportsDescription && (
            <p className="text-base md:text-lg mb-8 md:mb-12 max-w-3xl">{reportsDescription}</p>
          )}

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {reports?.map((report, index) => (
              <div key={index} className="relative group cursor-pointer rounded-lg overflow-hidden">
                {report.backgroundImage && typeof report.backgroundImage === 'object' && (
                  <div className="absolute inset-0">
                    <Image
                      src={report.backgroundImage.url || ''}
                      alt={report.backgroundImage.alt || report.title || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    'relative z-10 p-4 md:p-8 h-48 md:h-64 flex flex-col md:flex-row justify-between gap-4 md:gap-8 bg-opacity-50 md:left-[25%] md:w-[75%]',
                    report.overlayBgColor || 'bg-black/50',
                  )}
                >
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="text-lg md:text-2xl font-bold pb-2 md:pb-4 border-b-2 border-white">
                      {report.title}
                    </h3>
                    <Button
                      onClick={() => {
                        if (report.file && typeof report.file === 'object') {
                          handleDownloadRequest(
                            report.file.id || '',
                            report.file.filename || report.title || 'Report',
                            'report',
                          )
                        }
                      }}
                      className="bg-white text-black hover:bg-gray-100 w-fit text-sm md:text-base"
                    >
                      Download
                    </Button>
                  </div>
                  <div className="hidden lg:block">
                    <svg
                      width="321"
                      height="545"
                      viewBox="0 0 321 545"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="max-w-full max-h-full w-auto h-auto"
                    >
                      <path
                        d="M11.1462 257.492C11.1405 257.367 11.1679 257.045 11.4548 256.467C12.0627 255.243 13.4801 253.567 15.9423 251.444C18.3488 249.369 21.5266 247.055 25.3654 244.512C33.0454 239.422 43.1032 233.588 54.3682 227.106C76.8006 214.2 103.897 198.8 125.223 182.152C135.89 173.825 145.245 165.086 151.88 156.075C158.509 147.071 162.594 137.559 162.276 127.765C161.957 117.96 157.258 108.855 150.044 100.521C142.829 92.1852 132.92 84.4088 121.739 77.1997C99.3833 62.7866 71.3689 50.2879 48.1668 39.9877C36.5143 34.8147 26.111 30.2127 18.1216 26.1683C14.1282 24.1466 10.8107 22.3002 8.27947 20.6279C5.67156 18.9049 4.19514 17.5545 3.56142 16.6042C3.43881 16.4203 3.37449 16.2872 3.33926 16.2023C3.74899 15.7528 5.06385 14.9144 8.26842 14.0657C14.5814 12.394 25.9171 11.233 43.811 10.7086C115.013 8.62206 179.791 21.0571 226.94 42.7101C274.278 64.4503 302.946 94.9989 304.043 128.728C305.139 162.458 278.51 194.627 232.673 219.097C187.02 243.47 123.173 259.675 51.9714 261.761C34.0829 262.286 22.7398 261.627 16.3793 260.079C13.1173 259.284 11.7654 258.389 11.3161 257.851C11.1597 257.663 11.1495 257.566 11.1462 257.492Z"
                        fill="#113140"
                        fill-opacity="0.1"
                        stroke="white"
                        stroke-width="6.00939"
                      />
                      <path
                        d="M20.477 536.038C20.2599 535.759 20.0229 535.362 20.5772 534.16C21.2035 532.802 22.6409 530.992 25.0923 528.725C27.4957 526.503 30.6677 524.027 34.4996 521.308C42.1671 515.866 52.2109 509.631 63.4615 502.703C85.8656 488.908 112.929 472.447 134.217 454.636C144.867 445.725 154.194 436.379 160.797 426.746C167.397 417.115 171.409 406.996 171.072 396.621C170.734 386.236 166.071 376.532 158.845 367.589C151.623 358.65 141.704 350.293 130.502 342.535C108.109 327.027 80.0594 313.561 56.8307 302.463C45.1644 296.89 34.7514 291.933 26.7539 287.579C22.7568 285.403 19.4361 283.416 16.9009 281.617C14.2978 279.77 12.7979 278.309 12.1385 277.25C11.8688 276.818 11.8291 276.591 11.8231 276.536C11.8329 276.517 11.8546 276.48 11.8977 276.426C12.2895 275.937 13.5822 275.033 16.8252 274.119C23.1106 272.346 34.4224 271.125 52.3157 270.601C123.487 268.515 188.271 281.984 235.456 305.3C282.774 328.681 311.667 361.538 312.851 397.956C314.035 434.373 287.331 468.86 241.621 494.967C196.04 521.001 132.254 538.238 61.083 540.324C43.1955 540.848 31.8748 540.117 25.5374 538.449C22.3059 537.599 20.9507 536.646 20.477 536.038Z"
                        fill="#113140"
                        fill-opacity="0.1"
                        stroke="white"
                        stroke-width="6.00939"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financials Section */}
      <section className="py-4 md:py-8">
        <div className="container max-w-screen-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 pl-4 pb-2 border-l-4 border-white">
            {financialsMainTitle}
          </h2>
          <div className="max-w-4xl">
            {financialsFurtherInfo && (
              <RichText
                enableGutter={false}
                content={financialsFurtherInfo}
                enableProse={true}
                className="text-base md:text-lg mb-6 md:mb-8 max-w-none"
              />
            )}
          </div>

          {!showDetails && (
            <div className="flex justify-center">
              <span
                onClick={() => setShowDetails(true)}
                className="mb-6 md:mb-8 cursor-pointer text-white hover:text-slate-100 border-b-2 border-white flex items-center gap-2 text-sm md:text-base"
              >
                <ChevronDown className="w-4 h-4" /> See more
              </span>
            </div>
          )}

          {showDetails && (
            <div className="space-y-8 md:space-y-12 animate-in slide-in-from-top-4 duration-1000 ease-in-out">
              {/* IR Calendar */}
              {investorRelationsCalendar && investorRelationsCalendar.length > 0 && (
                <div className="transition-all duration-1000 ease-in-out">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">IR Calendar</h3>

                    {/* View Toggle */}
                    <div className="flex items-center space-x-2 bg-white/10 rounded-3xl p-2">
                      <Button
                        onClick={() => setIrCalendarView('table')}
                        size="sm"
                        className={cn(
                          'flex items-center space-x-2 transition-all duration-300 text-xs md:text-sm',
                          irCalendarView === 'table'
                            ? 'bg-white text-blue-600 hover:bg-gray-100'
                            : 'bg-transparent text-white hover:bg-white/20',
                        )}
                      >
                        <Table className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Table View</span>
                        <span className="sm:hidden">Table</span>
                      </Button>
                      <Button
                        onClick={() => setIrCalendarView('calendar')}
                        size="sm"
                        className={cn(
                          'flex items-center space-x-2 transition-all duration-300 text-xs md:text-sm',
                          irCalendarView === 'calendar'
                            ? 'bg-white text-blue-600 hover:bg-gray-100'
                            : 'bg-transparent text-white hover:bg-white/20',
                        )}
                      >
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Calendar View</span>
                        <span className="sm:hidden">Calendar</span>
                      </Button>
                    </div>
                  </div>

                  {/* Year Filter for Table View */}
                  {irCalendarView === 'table' && irCalendarYears.length > 0 && (
                    <div className="mb-4">
                      <select
                        value={irCalendarYear}
                        onChange={(e) => setIrCalendarYear(e.target.value)}
                        className="bg-white text-black px-3 py-2 rounded border text-xs md:text-sm w-full md:w-auto"
                      >
                        <option value="all">All Years</option>
                        {irCalendarYears.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Content with smooth transition */}
                  <div className="transition-all duration-1000 ease-in-out">
                    {irCalendarView === 'table' ? (
                      <div className="bg-transparent text-black rounded-lg overflow-hidden animate-in fade-in duration-500">
                        <div className="overflow-x-auto">
                          <table
                            className="w-full min-w-[600px]"
                            style={{ borderSpacing: '0 4px' }}
                          >
                            <thead className="bg-slate-700 text-white">
                              <tr>
                                <th
                                  className="px-3 md:px-6 py-3 text-left cursor-pointer hover:bg-slate-900 transition-colors text-xs md:text-sm"
                                  onClick={() =>
                                    setIrCalendarSort(irCalendarSort === 'asc' ? 'desc' : 'asc')
                                  }
                                >
                                  Date {irCalendarSort === 'asc' ? '↑' : '↓'}
                                </th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                                  Event
                                </th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                                  Remarks
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedIrCalendar.map((item, index) => (
                                <tr
                                  key={`${index}-calendar`}
                                  className={cn(
                                    'border-b hover:bg-gray-200 transition-colors',
                                    index % 2 === 1 ? 'bg-blue-50' : 'bg-white',
                                    'my-2',
                                  )}
                                >
                                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm">
                                    {formatDate(item.date)}
                                  </td>
                                  <td className="px-3 md:px-6 py-4 font-medium text-xs md:text-sm">
                                    {item.title}
                                  </td>
                                  <td className="px-3 md:px-6 py-4">
                                    {item.file && typeof item.file === 'object' && (
                                      <span
                                        onClick={() => {
                                          const file = item.file as NonNullable<typeof item.file>
                                          handleDownloadRequest(
                                            file.id || '',
                                            file.filename || item.title || 'IR Calendar Item',
                                            'ir-calendar',
                                          )
                                        }}
                                        className="cursor-pointer text-blue-600 font-semibold hover:text-blue-900 pb-1 hover:border-b-2 hover:border-blue-900 inline-flex gap-1 items-center text-xs md:text-sm"
                                      >
                                        <FileDown className="h-4 w-4 md:h-6 md:w-6" />
                                        <span className="hidden md:inline">Download</span>
                                        <span className="md:hidden">DL</span>
                                      </span>
                                    )}
                                    {!item.file && (
                                      <span className="text-gray-400 text-xs md:text-sm">N/A</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="animate-in fade-in duration-500">
                        <CalendarView />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Financial Results */}
              {financialResults && financialResults.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Financial Results</h3>

                  {/* Year Filter */}
                  {financialResultsYears.length > 0 && (
                    <div className="mb-4">
                      <select
                        value={financialResultsYear}
                        onChange={(e) => setFinancialResultsYear(e.target.value)}
                        className="bg-white text-black px-3 py-2 rounded border text-xs md:text-sm w-full md:w-auto"
                      >
                        <option value="all">All Years</option>
                        {financialResultsYears.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="bg-white text-black rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[400px]" style={{ borderSpacing: '0 4px' }}>
                        <thead className="bg-slate-700 text-white ">
                          <tr>
                            {/* <th
                              className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() =>
                                setFinancialResultsSort(
                                  financialResultsSort === 'asc' ? 'desc' : 'asc',
                                )
                              }
                            >
                              Date {financialResultsSort === 'asc' ? '↑' : '↓'}
                            </th> */}
                            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                              Financial Period
                            </th>
                            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                              Download
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedFinancialResults.map((result, index) => (
                            <tr
                              key={index}
                              className={cn(
                                'border-b hover:bg-gray-200 transition-colors',
                                index % 2 === 1 ? 'bg-blue-50' : 'bg-white',
                                'my-2',
                              )}
                            >
                              {/* <td className="px-6 py-4">{formatDate(result.date)}</td> */}
                              <td className="px-3 md:px-6 py-4 font-medium text-xs md:text-sm">
                                {result.title}
                              </td>
                              <td className="px-3 md:px-6 py-4">
                                <span
                                  onClick={() => {
                                    if (result.file && typeof result.file === 'object') {
                                      const file = result.file as NonNullable<typeof result.file>
                                      handleDownloadRequest(
                                        file.id || '',
                                        file.filename || result.title || 'Financial Result',
                                        'financial-result',
                                      )
                                    }
                                  }}
                                  className="cursor-pointer text-blue-600 font-semibold hover:text-blue-900 pb-1 hover:border-b-2 hover:border-blue-900 inline-flex gap-1 items-center text-xs md:text-sm"
                                >
                                  <FileDown className="w-4 h-4 md:w-6 md:h-6" />
                                  <span className="hidden md:inline">Download</span>
                                  <span className="md:hidden">DL</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Ratios */}
              {financialRatios && financialRatios.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Financial Ratios</h3>

                  {/* Year Filter */}
                  {financialRatiosYears.length > 0 && (
                    <div className="mb-4">
                      <select
                        value={financialRatiosYear}
                        onChange={(e) => setFinancialRatiosYear(e.target.value)}
                        className="bg-white text-black px-3 py-2 rounded border text-xs md:text-sm w-full md:w-auto"
                      >
                        <option value="all">All Years</option>
                        {financialRatiosYears.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="bg-white text-black rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[400px]" style={{ borderSpacing: '0 4px' }}>
                        <thead className="bg-slate-700 text-white">
                          <tr>
                            {/* <th 
                              className="px-6 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() => setFinancialRatiosSort(financialRatiosSort === 'asc' ? 'desc' : 'asc')}
                            >
                              Date {financialRatiosSort === 'asc' ? '↑' : '↓'}
                            </th> */}
                            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                              Financial Period
                            </th>
                            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm">
                              Download
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedFinancialRatios.map((ratio, index) => (
                            <tr
                              key={index}
                              className={cn(
                                'border-b hover:bg-gray-200 transition-colors',
                                index % 2 === 1 ? 'bg-blue-50' : 'bg-white',
                                'my-2',
                              )}
                            >
                              {/* <td className="px-6 py-4">{formatDate(ratio.date)}</td> */}
                              <td className="px-3 md:px-6 py-4 font-medium text-xs md:text-sm">
                                {ratio.title}
                              </td>
                              <td className="px-3 md:px-6 py-4">
                                <span
                                  onClick={() => {
                                    if (ratio.file && typeof ratio.file === 'object') {
                                      const file = ratio.file as NonNullable<typeof ratio.file>
                                      handleDownloadRequest(
                                        file.id || '',
                                        file.filename || ratio.title || 'Financial Ratio',
                                        'financial-ratio',
                                      )
                                    }
                                  }}
                                  className="cursor-pointer text-blue-600 font-semibold hover:text-blue-900 pb-1 hover:border-b-2 hover:border-blue-900 inline-flex gap-1 items-center text-xs md:text-sm"
                                >
                                  <FileDown className="w-4 h-4 md:w-6 md:h-6" />
                                  <span className="hidden md:inline">Download</span>
                                  <span className="md:hidden">DL</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <p
                  onClick={() => setShowDetails(false)}
                  className="mb-6 md:mb-8 cursor-pointer text-white hover:text-slate-100 border-b-2 border-white flex items-center gap-2 text-sm md:text-base"
                >
                  <ChevronUp className="w-4 h-4" /> See less
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <PasswordDialog
        isOpen={passwordDialog.isOpen}
        onOpenChange={(open) => setPasswordDialog((prev) => ({ ...prev, isOpen: open }))}
        onPasswordSubmit={handlePasswordSubmit}
      />
    </div>
  )
}
