import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}


export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  console.log(element);
  if (element) {
    // Use a more sophisticated scroll animation
    window.scrollTo({
      top: element.offsetTop - 80, // Offset to account for navbar height
      behavior: 'smooth',
    })
    
    // Add a subtle highlight effect to the target element
    setTimeout(() => {
      element.classList.add('scroll-highlight')
      
      // Remove the highlight class after the animation
      setTimeout(() => {
        element.classList.remove('scroll-highlight')
      }, 1500)
    }, 800) // Allow time for scrolling to complete
  }
}