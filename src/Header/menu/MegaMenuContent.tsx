import React from "react";
import { MenuItem } from "./types";

interface MegaMenuContentProps {
  items: MenuItem[];
}

export const MegaMenuContent = ({ items }: MegaMenuContentProps) => (
  <div>
    {/* <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
      {title}
    </h3> */}
    <div className="space-y-2">
      {items.map((item, index) => {
        if (item.type === "subheading") {
          return (
            <h4
              key={item.label}
              className="text-base font-small text-gray-400 pt-4 ">
              {item.label}
            </h4>
          );
        }

        if (item.type === "divider") {
          return (
            <div
              key={`divider-${index}`}
              className="border-t border-gray-900"></div>
          );
        }

        if (item.type === "text") {
          return (
            <p key={item.label} className="text-sm text-gray-400 max-w-[500px]">
              {item.label}
            </p>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            className="block text-xl font-base text-gray-1000 hover:text-teal-600 py-2 transition-colors duration-200">
            {item.label}
            {item.description && (
              <span className="block text-sm text-gray-400 mt-1">
                {item.description}
              </span>
            )}
          </a>
        );
      })}
    </div>
  </div>
);
