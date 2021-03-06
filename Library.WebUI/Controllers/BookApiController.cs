﻿using Library.Domain.Abstracts;
using Library.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Library.WebUI.Controllers
{
    public class BookApiController : ApiController
    {
        private IBookRepository repository;
        private IDataRequired<Book> dataReqiered;
        public BookApiController(IBookRepository bookRepository, IDataRequired<Book> dRequired)
        {
            this.repository = bookRepository;
            this.dataReqiered = dRequired;
        }

        public async Task<IHttpActionResult> GetBooks()
        {
            IEnumerable<Book> Books = await repository.GetAllBooks();
            return Ok(Books);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> CreateBook([FromBody] Book book)
        {
            int DbResult = 0;
            HttpResponseMessage RespMessage = new HttpResponseMessage(HttpStatusCode.BadRequest);
            if(dataReqiered.IsDataNoEmpty(book))
            {
                DbResult = await repository.CreateBook(book);
                if(DbResult != 0)
                {
                    RespMessage = new HttpResponseMessage(HttpStatusCode.Created);
                }
            }
            return RespMessage;
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdateBook(string id, [FromBody] Book book)
        {
            int DbResult = 0;
            HttpResponseMessage RespMessage = new HttpResponseMessage(HttpStatusCode.BadRequest);
            if (!String.IsNullOrEmpty(id) && dataReqiered.IsDataNoEmpty(book))
            {
                DbResult = await repository.UpdateBook(id, book);
                if(DbResult != 0)
                {
                    RespMessage = new HttpResponseMessage(HttpStatusCode.Created);
                }
            }
            return RespMessage;
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteBook(string id)
        {
            int DbResult = 0;
            HttpResponseMessage RespMessage = new HttpResponseMessage(HttpStatusCode.BadRequest);
            if (!String.IsNullOrEmpty(id))
            {
                DbResult = await repository.DeleteBook(id);
                if(DbResult != 0)
                {
                    RespMessage = new HttpResponseMessage(HttpStatusCode.OK);
                }
            }
            return RespMessage;
        }

        [Route("BookApi/GetBookByAuthorId/{id}")]
        public async Task<IHttpActionResult> GetBookByAuthorId(string id)
        {
            IEnumerable<Book> Books = await repository.GetBookByAuthorId(id);
            return Ok(Books);
        }
    }
}