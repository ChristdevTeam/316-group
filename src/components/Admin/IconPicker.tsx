'use client'

import React, { useState, useMemo, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa6'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io5'
import { useField } from '@payloadcms/ui'
import './IconPicker.css'

// Aggregate all icons into a single object
const AllIcons = { ...FaIcons, ...MdIcons, ...IoIcons }
const iconList = Object.keys(AllIcons)

type IconPickerProps = {
  path: string
  label?: string
  required?: boolean
}

export const IconPicker: React.FC<IconPickerProps> = ({ path, label, required }) => {
  const { value, setValue } = useField<string>({ path })
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Debounce search to prevent lag with huge icon set
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const filteredIcons = useMemo(() => {
    if (!debouncedSearch) return iconList.slice(0, 60)
    return iconList
      .filter((name) => name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .slice(0, 100)
  }, [debouncedSearch])

  const SelectedIcon = value && (AllIcons as any)[value] ? (AllIcons as any)[value] : null

  return (
    <div className="field-type text admin-icon-picker">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      <div className="relative">
        {isOpen ? (
          <div className="icon-picker-modal">
            <div className="search-bar">
              <input
                className="search-input"
                placeholder="Search icons (e.g. wifi, car, home)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
            <div className="icon-grid">
              {filteredIcons.map((iconName) => {
                const Icon = (AllIcons as any)[iconName]
                if (!Icon) return null
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      setValue(iconName)
                      setIsOpen(false)
                    }}
                    className={`icon-btn ${value === iconName ? 'selected' : ''}`}
                    title={iconName}
                  >
                    <Icon size={24} />
                  </button>
                )
              })}
            </div>
            {filteredIcons.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>No icons found</p>
            )}
          </div>
        ) : (
          <div className="trigger-area">
            <div className="preview-box" onClick={() => setIsOpen(true)}>
              {SelectedIcon ? (
                <SelectedIcon size={24} />
              ) : (
                <span style={{ fontSize: '0.75rem', color: '#888' }}>None</span>
              )}
            </div>
            <button type="button" className="action-btn" onClick={() => setIsOpen(true)}>
              {value ? 'Change Icon' : 'Select Icon'}
            </button>
            {value && (
              <button type="button" className="clear-btn" onClick={() => setValue('')}>
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default IconPicker
