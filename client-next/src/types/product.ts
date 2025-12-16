import { Category } from "./category";

export interface ProductResponse {
  success: boolean;
  message: string;
  currentPage?: number;
  totalPages?: number;
  data: Product[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  sellingPrice: number;
  discountPrice: number;
  colors: string[];
  sizes: string[];
  stock: number;
  category: Category;
  subCategory: string;
  featured: boolean;
  hotSell: boolean;
  ratings: [];
  reviews: [];
  ratingAverage: number;
}

// _id: '67e41d883ab2056d3f6833ba',
//       name: 'Cotton Three Piece',
//       description: 'Cotton Three Piece',
//       images: [ 'images-1743003016373-375265449.jpg' ],
//       sellingPrice: 4000,
//       discountPrice: 3900,
//       colors: [ 'pink' ],
//       sizes: [ 'm', 'l', 'xl' ],
//       stock: 200,
//       category: {
//         _id: '67e4152d3ab2056d3f68333e',
//         name: 'Ladies 3 piece dress',
//         description:
//           'Crafted from fabrics like cotton, lawn, chiffon, silk, georgette, velvet, and organza.  Features prints, embroidery, lacework, zari, sequins, or embellishments for different occasions.',
//         subCategories: [ 'cotton', 'pakistani', 'katan', 'georgette' ],
//         thumb: 'image-1743000877645-438960971.jpg',
//         products: [ '67e41c953ab2056d3f6833a7', '67e41d883ab2056d3f6833ba' ],
//         createdAt: '2025-03-26T14:54:37.652Z',
//         updatedAt: '2025-03-26T15:30:16.444Z',
//         __v: 0
//       },
//       subCategory: 'cotton',
//       featured: true,
//       hotSell: false,
//       ratings: [],
//       reviews: [
//         {
//           _id: '689754adc77158701bf4c598',
//           user: '68974edbc77158701bf4c4d0',
//           product: '67e41d883ab2056d3f6833ba',
//           rating: 5,
//           comment: 'Recomended',
//           createdAt: '2025-08-09T14:01:17.188Z',
//           updatedAt: '2025-08-09T14:01:17.188Z',
//           __v: 0
//         }
//       ],
//       createdAt: '2025-03-26T15:30:16.377Z',
//       updatedAt: '2025-08-09T14:01:17.289Z',
//       __v: 0,
//       ratingAverage: 5
//     },
