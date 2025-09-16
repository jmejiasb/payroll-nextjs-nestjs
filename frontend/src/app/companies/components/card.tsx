"use client";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

import type { IconType } from "react-icons";
import React from "react";

type IconButtonProps = {
  icon: IconType;
  label: string; // for screen readers
  onClick?: () => void;
};

function IconButton({ icon: Icon, label, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex items-center justify-center rounded-md p-2
                 text-slate-600 hover:text-slate-900 hover:bg-white/60
                 focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer"
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}

interface CardProps {
  id: string;
  name: string;
  rut: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const Card = ({ id, name, rut, onEdit, onDelete }: CardProps) => {
  return (
    <div className="flex flex-col w-full max-w-80 h-full bg-sky-200 rounded-2xl p-4 gap-3 shadow-lg hover:bg-sky-300 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3 p-4 pb-2">
        <div className="min-w-0">
          <h3 className="font-extrabold text-slate-900 leading-tight truncate">
            {name}
          </h3>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-md text-slate-600">
          <span className="font-mono-">Rut:</span>{" "}
          <span className="font-mono">{rut}</span>
        </p>
      </div>
      <div className="flex justify-end gap-3">
        <IconButton
          icon={HiPencilAlt}
          label="Edit company"
          onClick={() => onEdit?.(id)}
        />
        <IconButton
          icon={HiOutlineTrash}
          label="Delete company"
          onClick={() => onDelete?.(id)}
        />
      </div>
    </div>
  );
};

export default Card;
