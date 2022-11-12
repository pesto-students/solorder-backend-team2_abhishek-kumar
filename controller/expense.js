const { pool, client } = require('../db');
const fs = require('fs');


exports.AddExpense = async (formData, req, res, next) => {
  try {
    let { fields, files } = formData
    if (files && files.file && files.file.length) {
      let file = files.file[0]
      console.log({ fields, file })
      let {originalFilename,headers} = file
      const byteArray = fs.readFileSync(file.path);
      let result = await pool.query(`INSERT INTO doc(file_name,filedata,contentype) VALUES($1,$2,$3) RETURNING *`, [originalFilename, byteArray,headers['content-type']])

      res.json({
        error: false,
        msg: "FILE Uploaded successfully",
        data: result
      })
    } else {
      throw ({ error: true, msg: "File not found", status: 400 })
    }
    res.end()
  } catch (error) {
    next(error)
  }
};

exports.getFile = async (req, res, next) => {
  try {
    let result = await pool.query(`SELECT * FROM doc WHERE doc_id=$1`, [11])
    if (result && result.rows && result.rows.length) {
      let fileData = result.rows[0]
      res.set("Content-Type", fileData.contentype);
      res.set('content-disposition', `filename=${fileData.file_name}`);
      res.send(fileData.filedata)
    }
    res.end();
  } catch (error) {
    next(error)
  }
};