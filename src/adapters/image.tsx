import type { ComponentType, ImgHTMLAttributes } from 'react'

export interface ImageComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  blurDataURL?: string
  style?: ImgHTMLAttributes<HTMLImageElement>['style']
  onLoad?: ImgHTMLAttributes<HTMLImageElement>['onLoad']
}

export type ImageComponent = ComponentType<ImageComponentProps>

export const DefaultImage: ImageComponent = ({ src, alt, width, height, className, priority, style }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={style}
    loading={priority ? 'eager' : 'lazy'}
  />
)
