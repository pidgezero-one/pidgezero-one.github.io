import { ReactNode } from "react";

interface TableProps {
  additionalClass?: string;
  children?: ReactNode;
}

export const Table: React.FC<TableProps> = ({ additionalClass, children }) => {
  let className = "display-table";
  if (!!additionalClass) {
    className += ` ${additionalClass}`;
  }
  return <div className={className}>{children}</div>;
};

export const TableRow: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="display-row">{children}</div>;
};

type alignment = "left" | "center" | "right";

interface CellProps {
  width?: number;
  children?: ReactNode;
  align?: alignment;
}

export const TableCell: React.FC<CellProps> = ({
  width,
  children,
  align = "left",
}) => {
  const style = { align } as React.CSSProperties;
  if (!!width) {
    style.width = `${width}%`;
  }

  return (
    <div className="display-cell" style={style}>
      {children}
    </div>
  );
};

export const Modal: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div>test box</div>;
};
