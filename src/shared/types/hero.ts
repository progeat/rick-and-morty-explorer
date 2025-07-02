export interface HeroModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'unknown';
  image: string;
  created: string;
}
