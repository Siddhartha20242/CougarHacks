import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {    // This is something that get's installed when we install Tailwind CSS but many people
  // don't know this they think this is just a function that get's downloaded. Yes it's true but this is mainly a utility function to tailwind CSS classes with JS without any conflicts
  return twMerge(clsx(inputs))
}
