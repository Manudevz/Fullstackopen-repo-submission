import { FC } from 'react'

interface TitleProps {
  title: string;
}
export const Title: FC<TitleProps> = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
