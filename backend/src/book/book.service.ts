import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Book from './book.entity';
import { CreateBookInput } from './dtos/create-book.input';
import { DeleteBookInput } from './dtos/delete-book.input';
import { UpdateBookInput } from './dtos/update-book.input';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async createBook(book: CreateBookInput): Promise<Book> {
    if (!book.description || !book.name) throw new Error('field is required');
    const newBook = this.bookRepository.create(book);
    return this.bookRepository.save(newBook);
  }

  async updateBook(bookInput: UpdateBookInput): Promise<Book> {
    if (!bookInput.description || !bookInput.name) throw new Error('field is required');
    const bookToUpdate = await this.bookRepository.findOne({
      where: { id: bookInput.id },
    });
    if (!bookToUpdate || bookToUpdate.id !== bookInput.id)
      throw new Error('book does not exist');
    bookToUpdate.description =
      bookInput.description || bookToUpdate.description;
    bookToUpdate.name = bookInput.name || bookToUpdate.name;
    return this.bookRepository.save(bookToUpdate);
  }

  async deleteBook(bookInput: DeleteBookInput): Promise<Book> {
    const bookToDelete = await this.bookRepository.findOne({
      where: { id: bookInput.id },
    });
    if (!bookToDelete || bookToDelete.id !== bookInput.id)
      throw new Error('book does not exist');
    const duplicate = { ...bookToDelete };
    await this.bookRepository.remove(bookToDelete);
    return duplicate;
  }
}
