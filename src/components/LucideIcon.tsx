import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function LucideIcon({ name, className = "", size = 24 }: LucideIconProps) {
  // Safe lookup for standard Lucide icons
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Return a default icon if not found
    return <Icons.Shield className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
