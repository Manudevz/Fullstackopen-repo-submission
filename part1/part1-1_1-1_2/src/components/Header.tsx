import React, { FC } from "react";

interface HeaderProps {
  courseTitle: string;
}

export const Header: FC<HeaderProps> = ({ courseTitle }) => {
  return (
    <h1>{courseTitle}</h1>
  );
};
