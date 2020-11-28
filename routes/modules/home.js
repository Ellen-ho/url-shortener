const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const generateUrl = require('../../public/javascripts/generateUrl')
const Url = require('../../models/Url')

// 進入 Index
router.get('/', (req, res) => {
  // 取得下拉式選單資料
  // Category.find()
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then((categories) => {
  //     return res.render('new', { categories })
  //   })
  //   .catch((error) => console.log(error))
  return res.render('index')
})

// 取得短網址
router.post('/', (req, res) => {
  // 從 req.body 拿出表單裡的資料
  const originUrl = req.body.originUrl
  const hashFromOriginUrl = getSHA1Hash(originUrl)
  console.log('hashFromOriginUrl: ', hashFromOriginUrl)

  Url.find({ hash: hashFromOriginUrl })
    .lean()
    .then((result) => {
      // 若沒找到就產生一組並儲存
      if (result === null) {
        // 產生短網址亂碼
        const shortUrlHash = generateUrl()
        const originHost = req.get('origin')
        const shortUrl = `${originHost}/${shortUrlHash}`
        console.log('originHost: ', originHost)
        console.log('shortUrl: ', shortUrl)
        // 建立實例模型
        const newShortUrl = new Url({
          hash: hashFromOriginUrl,
          shortUrl: shortUrl
        })
        // 將實例存入資料庫
        return newShortUrl.save()
          .then(() => res.render('index', { shortUrl }))
          .catch((error) => console.log(error))
      } else {
        return res.render('index', { shortUrl: result.shortUrl })
      }
    })
    .catch((error) => console.log(error))
})

module.exports = router

function getSHA1Hash (data) {
  return crypto.createHash('sha1').update(data).digest('hex')
}
