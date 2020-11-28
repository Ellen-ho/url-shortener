const express = require('express')
const router = express.Router()
const PORT = process.env.PORT ? '' : ':3000'
const generateUrl = require('../../public/javascripts/generateUrl')
const Url = require('../../models/url')

// 進入 Index
router.get('/', (req, res) => {
  return res.render('index')
})
// 導向原先儲存的網址
router.get('/:hash', (req, res) => {
  const hash = req.params.hash

  Url.find({ shortUrlHash: hash })
    .lean()
    .then((result) => {
      // 沒找到表示之前沒轉換過
      if (result.length === 0) {
        return res.render('index', { error: 'The short URL does not exist!' })
      } else {
        res.redirect(result[0].originUrl)
      }
    })
    .catch((error) => console.log(error))
})

// 產生短網址
router.post('/', (req, res) => {
  // 從 req.body 拿出表單裡的資料
  const originUrl = req.body.originUrl.trim()
  // 輸入空格就導回首頁
  if (originUrl === '') { res.redirect('/') }

  const originHost = `${req.protocol}://${req.hostname}${PORT}`
  // 尋找是否有儲存原連結
  Url.find({ originUrl: originUrl })
    .lean()
    .then((result) => {
      // 若沒找到就產生一組並儲存
      if (result.length === 0) {
        // 確認短網址沒有重複
        Url.find()
          .lean()
          .then((urlList) => {
            // 產生短網址亂碼 & 確保沒有重複
            let shortUrlHash
            do {
              shortUrlHash = generateUrl(5)
            } while (hasDuplicatedShortUrlHash(urlList, shortUrlHash))

            // 建立實例模型
            const newShortUrl = new Url({
              originUrl: originUrl,
              shortUrlHash: shortUrlHash
            })
            const shortUrl = `${originHost}/${shortUrlHash}`
            // 將實例存入資料庫
            return newShortUrl.save()
              .then(() => res.render('index', { shortUrl }))
              .catch((error) => console.log(error))
          })
      } else {
        return res.render('index', { shortUrl: `${originHost}/${result[0].shortUrlHash}` })
      }
    })
    .catch((error) => console.log(error))
})

module.exports = router

function hasDuplicatedShortUrlHash (urlList, urlHash) {
  const result = urlList.some((v) => {
    return v.shortUrlHash === urlHash
  })
  return result
}
