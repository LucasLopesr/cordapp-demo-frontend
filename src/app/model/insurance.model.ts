import {Coverage} from './coverage.model';
import { Product } from './product.model';

export class InsuranceRequest {
  productId: string;
  coveragesIds: string[];
  insurer: string;
}

export class Insurance {
  product: Product;
  coverages: Coverage[];
  value: number;
  brand: string;
  insurer: string;
  seller: string;
  timeInMilli: number;
}
