import React from 'react'

export function Title({ children }: { children: string}) {
  return (
    <h3 className="font-semibold text-gray text-sm">{children}</h3>
  )
}
