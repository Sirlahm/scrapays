import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import {CreateBookInput } from './dtos/create-book.input';
import { BookService } from './book.service';
import Book from './book.entity';
import { DeleteBookInput } from './dtos/delete-book.input';
import { UpdateBookInput } from './dtos/update-book.input';
import { UseGuards } from '@nestjs/common';
import { BookGraphqlGaurd } from 'src/auth/auth.gaurd';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  async getAllBooks() {
    return this.bookService.getAll();
  }

  @UseGuards(BookGraphqlGaurd)
  @Mutation(() => Book)
  createBook(@Args('bookInput') bookInput: CreateBookInput): Promise<Book> {
    return this.bookService.createBook(bookInput);
  }

  @UseGuards(BookGraphqlGaurd)
  @Mutation(() => Book)
  async updateBook( @Args('bookInput') bookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.updateBook(bookInput)
  }

  @UseGuards(BookGraphqlGaurd)
  @Mutation(() => Book)
  async deleteBook( @Args('bookInput') bookInput: DeleteBookInput,
  ): Promise<Book> {
    return this.bookService.deleteBook(bookInput)
  }
}
