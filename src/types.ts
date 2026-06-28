export interface Solution {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface Environment {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  focus: string[];
}

export interface TimelineStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
}
