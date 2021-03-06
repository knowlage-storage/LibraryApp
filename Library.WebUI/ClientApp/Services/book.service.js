"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.url = "http://localhost:1483/BookApi";
    }
    BookService_1 = BookService;
    BookService.prototype.getBooks = function () {
        return this.http.get(this.url)
            .map(function (resp) {
            var bookList = resp.json();
            var books = [];
            for (var index in bookList) {
                console.log(bookList[index]);
                var book = bookList[index];
                books.push({ id: book.Id, year: book.Year, name: book.Name, description: book.Description, authorId: book.AuthorId });
            }
            return books;
        }).catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    BookService.prototype.getBookByAuthorId = function (id) {
        return this.http.get(this.url + '/GetBookByAuthorId/' + id).map(function (resp) {
            var bookList = resp.json();
            var books = [];
            for (var index in bookList) {
                var book = bookList[index];
                console.log(bookList[index]);
                books.push({ id: book.Id, year: book.Year, name: book.Name, description: book.Description, authorId: book.AuthorId });
            }
            return books;
        }).catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    BookService.prototype.createBook = function (obj) {
        var body = JSON.stringify(obj);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charser=utf8' });
        return this.http.post(this.url, body, { headers: headers })
            .map(function (res) { return BookService_1.json(res); })
            .catch(this.handleError);
    };
    BookService.prototype.updateBook = function (id, obj) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charser=utf8' });
        var body = JSON.stringify(obj);
        return this.http.put(this.url + '/' + id, body, { headers: headers })
            .map(function (res) { return BookService_1.json(res); })
            .catch(this.handleError);
    };
    BookService.prototype.deleteBook = function (id) {
        return this.http.delete(this.url + '/' + id)
            .map(function (res) { return BookService_1.json(res); })
            .catch(this.handleError);
    };
    BookService.json = function (res) {
        return res.text() === "" ? res : res.json();
    };
    BookService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error);
    };
    BookService = BookService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], BookService);
    return BookService;
    var BookService_1;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map