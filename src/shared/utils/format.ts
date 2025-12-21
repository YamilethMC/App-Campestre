// Utility functions for the Club Campestre app

// Format date to a more readable format
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('es-MX', options);
};

// Format time from HH:MM format
export const formatTime = (timeString: string): string => {
  // Assuming timeString is in HH:MM format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);

  if (hour >= 12) {
    if (hour === 12) {
      return `${hour}:${minutes} PM`;
    }
    return `${hour - 12}:${minutes} PM`;
  } else {
    if (hour === 0) {
      return `12:${minutes} AM`;
    }
    return `${hour}:${minutes} AM`;
  }
};

// Get initials from a full name
export const getInitials = (name: string): string => {
  if (!name) return '';

  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
};
