import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProduct } from './products.interface';
import { ProductsDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'tv',
      price: 2000,
      category: 'electronics',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'earphones',
      price: 20,
      category: 'electronics',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'phone',
      price: 350,
      category: 'electronics',
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'milk',
      price: 2,
      category: 'dairy',
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'butter',
      price: 4,
      category: 'dairy',
      createdAt: new Date().toISOString(),
    },
  ];

  private productsKa = [
    {
      id: 1,
      name: 'ტვ',
      price: 2000,
      category: 'ელექტრონიკა',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'ყურსასმენები',
      price: 20,
      category: 'ელექტრონიკა',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'მობილური ტელეფონი',
      price: 350,
      category: 'ელექტრონიკა',
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'რძე',
      price: 2,
      category: 'რძის ნაწარმი',
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'კარაქი',
      price: 4,
      category: 'რძის ნაწარმი',
      createdAt: new Date().toISOString(),
    },
  ];

  // getAllProducts(): IProduct[] {
  //   return this.products;
  // }

  getAllProducts(
    price: number,
    category: string,
    lang: string,
    token: string,
  ): IProduct[] {
    if (!token)
      throw new HttpException(
        'Authorization is required',
        HttpStatus.BAD_REQUEST,
      );
    let filteredProducts = this.products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category,
      );
    }
    if (price) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price > price,
      );
    }
    if (lang === 'ka') {
      return this.productsKa;
    }
    return filteredProducts;
  }

  getProductById(id: number) {
    const existedProduct = this.products.find((el) => el.id === id);
    if (!existedProduct)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return existedProduct;
  }

  createProduct(body: ProductsDto) {
    if (!body.category || !body.name || !body.price)
      throw new HttpException(
        'Name, Category and Price are required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.products[this.products.length - 1]?.id || 1;
    const newProduct = {
      ...body,
      id: lastId + 1,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }

  updateProduct(id: number, body: ProductsDto) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const updateProduct = {
      ...this.products[index],
      ...body,
    };
    this.products[index] = updateProduct;
    return updateProduct;
  }
}
