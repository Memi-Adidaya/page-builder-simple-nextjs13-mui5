'use client'

import React from 'react'
import { componentRegistry } from '../../hooks/page-builder/registry/registry'
import type { Section } from '../../types/types'

export const PreviewRenderer: React.FC<{ sections: Section[] }> = ({ sections }) => {
  if (!sections) return null

  return (
    <>
      {sections.map(section => {
        const config = componentRegistry[section.type]
        if (!config) {
          console.warn(`Component type "${section.type}" not found in registry.`)
          return null
        }

        const Component = config.component
        const componentProps = {
          ...section.props,
          id: section.id,
          isPreviewMode: true,
          ...(config.isLayout && { columns: section.columns })
        }

        return <Component key={section.id} {...componentProps} />
      })}
    </>
  )
}
