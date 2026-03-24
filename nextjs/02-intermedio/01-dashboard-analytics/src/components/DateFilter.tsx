'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface DateFilterProps {
  currentRange: string
}

export function DateFilter({ currentRange }: DateFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const ranges = [
    { value: '7', label: '7 días' },
    { value: '30', label: '30 días' },
    { value: '90', label: '90 días' }
  ]

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('range', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="date-filter">
      {ranges.map(range => (
        <button
          key={range.value}
          className={currentRange === range.value ? 'active' : ''}
          onClick={() => handleChange(range.value)}
        >
          {range.label}
        </button>
      ))}
    </div>
  )
}
