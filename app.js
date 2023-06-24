const express = require('express')
//設定engine
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

//設定副檔名可以使用.hbs
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

//使用靜態資料(public資料夾)
app.use(express.static('public'))

app.get('/', (req, res) => {
  //重新導向
  res.redirect('restaurants')
})

//顯示全部的餐廳
app.get('/restaurants', (req, res) => {
  res.render('index')
})

//顯示單個餐廳的資料
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant id: ${id}`)
})

//啟動監聽
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})