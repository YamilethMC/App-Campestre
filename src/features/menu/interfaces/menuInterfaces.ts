interface Menu {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'specials';
  uploadDate: string;
  fileSize: string;
  rating: number;
  isFeatured: boolean;
  image?: string;
}

export interface MenuCardProps {
  menu: Menu;
  onDownloadPress: () => void;
  onViewPress: () => void;
}

interface FilterCounts {
  all: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  drinks: number;
  specials: number;
}

export interface MenuFilterProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  counts: FilterCounts;
}

export interface MenuHeaderProps {
  menuCount: number;
  onDownloadPress: () => void;
}
