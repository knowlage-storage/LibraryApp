﻿using Library.Domain.Abstracts;
using Library.Domain.Entities;
using Library.Domain.Helper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Library.Domain.Concrete
{
    public class BookRepository : IBookRepository
    {
        private IEnumerable<Book> result = null;
        private IConvertDataHelper<BookMsSql, Book> MsSqlDataConvert;
        private LibraryContext db = new LibraryContext();

        public BookRepository(IConvertDataHelper<BookMsSql, Book> msSqlDataConvert)
        {
            this.MsSqlDataConvert = msSqlDataConvert;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
             List<BookMsSql> BookList = await db.Books.ToListAsync();

             if (BookList != null)
             {
                 MsSqlDataConvert.InitData(BookList);
                 result = MsSqlDataConvert.GetIEnumerubleDbResult();
             }
             return result; 
        }

        public async Task<int> CreateBook(Book book)
        {
             int DbResult = 0;
             if (book != null)
             {
                 int authorId = Convert.ToInt32(book.AuthorId);
                 BookMsSql newBook = new BookMsSql { Name = book.Name, Description = book.Description, Year = book.Year, AuthorId = authorId };
                 db.Books.Add(newBook);
                 DbResult = await db.SaveChangesAsync();
              }
              return DbResult;
        }

        public async Task<int> UpdateBook(string id, Book book)
        {
             int DbResult = 0;
             int upBookId = Convert.ToInt32(id);
             int Book_book_id = Convert.ToInt32(book.Id);
             BookMsSql updatingBook = null;
             updatingBook = await db.Books.FindAsync(upBookId);

             if (upBookId == Book_book_id)
             {
                 updatingBook.Year = book.Year;
                 updatingBook.Name = book.Name;
                 updatingBook.Description = book.Description;
                 db.Entry(updatingBook).State = EntityState.Modified;
                 DbResult = await db.SaveChangesAsync();
              }
              return DbResult;
        }

        public async Task<int> DeleteBook(string id)
        {
             int DbResult = 0;
             BookMsSql book = null;
             int delBookId = Convert.ToInt32(id);
             book = db.Books.Find(delBookId);

             if (book != null)
             {
                 db.Books.Remove(book);
                 DbResult = await db.SaveChangesAsync();
             }
             return DbResult;
        }

        public async Task<IEnumerable<Book>> GetBookByAuthorId(string authorId)
        {
            int author_Id = Convert.ToInt32(authorId);
            List<BookMsSql> BookList = await db.Books.Where(x => x.AuthorId == author_Id).ToListAsync();

            if (BookList != null)
            {
                MsSqlDataConvert.InitData(BookList);
                result = MsSqlDataConvert.GetIEnumerubleDbResult();
            }
            return result;
        }
    }
}
