const express = require('express')
//設定engine
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
//載入json資料
const restaurants = require('./public/jsons/restaurant.json').results

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
  //設定search bar 輸入的 keyword
  const keyword = req.query.keyword?.trim()
  //如果沒有keyword直接輸入restaurants
  //用filter找符合條件的陣列元素
  const matchedRestaurants = keyword ? restaurants.filter((rest) => 
  //Object.values輸出全部的property
    Object.values(rest).some((property) => {
      //判斷property是否為string
      if (typeof property === 'string') {
        //找出包含keyword的元素
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants : matchedRestaurants, keyword })
})

//顯示單個餐廳的資料
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('show', { restaurant })
})

//啟動監聽
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})