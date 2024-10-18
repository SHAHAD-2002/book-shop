const express = require('express');
    const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


//قاعدة بيانات تجربية للكتب
const books = [
    {isbn: '1', author: 'Chinua Achebe', title: 'Things Fall Apart', reviews: ['Great book!']},
    {isbn: '2', author: 'Hans Christian Andersen', title: 'Fairt tales', reviews: ['Classic Stories!']},
    {isbn: '3', author: 'Dante Alighieri', title: 'The Divine Comedy', reviews: ['Amazing epis!']},
];
// واجهة API لجلب قائمة الكتب
app.get('/api/books', async (req, res) => {
    res.json(books);
    // استخدام Axios لجلب البيانات من مصدر خارجي أو قاعدة بيانات
});



// واجهة API لجلب الكتب بناءً على ISBN
app.get('/api/books/:isbn', async (req, res) => {
    const book = books.find(b=> b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
    // استخدام Axios لجلب بيانات الكتاب بناءً على رقم ISBN
});



// واجهة API لجلب الكتب بناءً على المؤلف
app.get('/api/books/author/:author', async (req, res) => {
    const book = books.filter(b=> b.author.toLowerCase() === req.params.author.toLowerCase());
    if (book.length > 0) {
        res.json(book);
    } else {
        res.status(404).send('No books found with this author');
    }
    // جلب الكتب حسب المؤلف
});



// واجهة API لجلب الكتب بناءً على العنوان
app.get('/api/books/title/:title', async (req, res) => {
    const book = books.filter(b=> b.title.toLowerCase() === req.params.title.toLowerCase());
    if (book.length > 0) {
        res.json(book);
    } else {
        res.status(404).send('No books found with this title');
    }
    // جلب الكتب حسب العنوان
});



// واجهة API لجلب مراجعات الكتب
app.get('/api/books/review/:isbn', async (req, res) => {
    const book = books.filter(b=> b.isbn === req.params.isbn);
    if (book && book.reviews) {
        res.json(book.reviews);
    } else {
        res.status(404).send('No reviews found with this book');
    }
    // جلب مراجعة الكتاب بناءً على رقم ISBN
});



// واجهة API لتسجيل مستخدم جديد
let users =[];
app.post('/api/register', async (req, res) => {
    const {username, password} = req.body;
    users.push({username, password});
    res.send('User registered successfully!');
    // منطق تسجيل المستخدم
});



// واجهة API لتسجيل الدخول
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
   const user = user.find( u => u.username === username && u.password === password);
   if (user){
    res.send('Customer successfully logged in');
   } else {
    res.status(401).send('Invalid credentials');
   } 
    // منطق تسجيل المستخدم
    // منطق تسجيل الدخول
});



// واجهة API لإضافة/تعديل مراجعة كتاب
app.post('/api/review', async (req, res) => {
    const { isbn, review } = req.body;
    const book = user.find( b => b.isbn === isbn);
   if (book){
    book.reviews.push(reviews);
    res.send('Review added successfully!');
   } else {
    res.status(404).send('Book not found');
   } 
    // منطق إضافة أو تعديل مراجعة
});



// واجهة API لحذف مراجعة كتاب
app.delete('/api/review/:reviewId', async (req, res) => {
    const { isbn} = req.params;
    const book = user.find( b => b.isbn === isbn);
   if (book && book.reviews.length > 0){
    book.reviews.pop();
    res.send('Review for the ISBN ${isbn} deleted');
   } else {
    res.status(404).send('Review not found');
   } 
    // منطق حذف مراجعة الكتاب
});



app.listen(PORT, () => {
console.log('sERVER IS RUNNING NO PORT ${PORT}');
});