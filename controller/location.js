const { default: axios } = require('axios');
const { json } = require('body-parser');
const { cloudinary } = require('../db');
const Model = require('../db/model');

exports.getPinCode = async (req, res, next) => {
  let { pincode } = req.params

  let data = new Promise((resolve, reject) => {
    axios({
      url: 'https://app.zipcodebase.com/api/v1/search?codes=' + pincode,
      headers: {
        "content-type": "	application/json",
        'apikey': process.env.ZIP_CODE_API_KEY
      },
    }).then((res) => {
      if (res.data && res.data.results && Object.keys(res.data.results).length && res.data.results[pincode]) {
        resolve(res.data.results[pincode])
      } else {
        reject({ error: true, msg: "Invalid Pincode.", status: 400 })
      }
    }).catch(error => {
      reject(error)
    })
  })

  data = await Promise.resolve(data);

  res.json({
    error: false,
    msg: "Pincode fetched successfully.",
    data: data
  })
};

exports.getPinCode = async (req, res, next) => {
  let { pincode } = req.params

  let data = new Promise((resolve, reject) => {
    axios({
      url: 'https://app.zipcodebase.com/api/v1/search?codes=' + pincode,
      headers: {
        "content-type": "	application/json",
        'apikey': process.env.ZIP_CODE_API_KEY,
        "Accept-Encoding": "gzip,deflate,compress"
      },
    }).then((res) => {
      if (res.data && res.data.results && Object.keys(res.data.results).length && res.data.results[pincode]) {
        resolve(res.data.results[pincode])
      } else {
        reject({ error: true, msg: "Invalid Pincode.", status: 400 })
      }
    }).catch(error => {
      reject(error)
    })
  })

  data = await Promise.resolve(data);

  res.json({
    error: false,
    msg: "Pincode fetched successfully.",
    data: data
  })
};

exports.getSearch = async (req, res, next) => {
  let { query } = req
  query = query ? query : {}
  let { search, lat, lng } = query

  let data = new Promise((resolve, reject) => {
    axios({
      url: `https://api.maptiler.com/geocoding/${search ? search : ""}.json?key=${process.env.MAPTILER_KEY}&language=en${lat && lng ? "&proximity=" + lat + "," + lng : ""}`,
      headers: {
        "content-type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress"
      }
    }).then((res) => {
      if (res.data && res.data.features && Array.isArray(res.data.features) && res.data.features.length) {
        resolve(res.data.features)
      } else {
        reject({ error: true, msg: "No place found.", status: 400 })
      }
    }).catch(error => {
      reject(error)
    })
  })

  data = await Promise.resolve(data);

  res.json({
    error: false,
    msg: "Place fetched successfully.",
    data: data
  })
};