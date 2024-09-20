import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //   @Get()
  //   getAllProducts() {
  //     return this.productsService.getAllProducts();
  //   }

  @Get()
  getAllProducts(
    @Query('price', new ParseIntPipe({ optional: true })) price: number,
    @Query('category') category: string,
    @Query('lang', new DefaultValuePipe('en')) lang,
    @Headers() headers
  ) {
    return this.productsService.getAllProducts(price, category, lang, headers.authorization);
    //headers.authorization: abc123
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() body: ProductsDto) {
    return this.productsService.createProduct(body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.productsService.updateProduct(id, body);
  }
}
