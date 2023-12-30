import { FC, MouseEvent } from 'react';

interface ButtonProps {
  title: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<ButtonProps> = ({ title, handleClick }) => {
  return (
    <button onClick={handleClick}>{title}</button>
  );
};
