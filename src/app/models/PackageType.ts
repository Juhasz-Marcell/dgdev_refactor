export interface Feature {
    name: string;
    price?: number;
    level?: string;
  }
  
  export interface AdditionalFeature {
    id: string;
    name: string;
    price: number;
  }
  
  export interface PackageType {
    header: string;
    basePrice: string;
    description: string;
    details: string;
    features: Feature[];
    additionalFeatures: AdditionalFeature[];
  }
  