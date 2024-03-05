const express = require('express');
const app = express();


const authMiddleWare = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    if (dayOfWeek === 0 || dayOfWeek === 6 || hourOfDay < 9 || hourOfDay >= 17) {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).');
    } else {
        next();
    }
};


app.use(authMiddleWare);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Static/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/Static/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/Static/contact.html');
});


app.use(express.static('Static'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
