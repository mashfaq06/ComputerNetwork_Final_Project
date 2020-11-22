const express = require('express')
const upload = require('express-fileupload')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

// ***************** MIDDLEWARE ********************************************

app.set('view engine', 'ejs')

const urlEcodedParser = bodyParser.urlencoded({ extended: false })

app.use(upload())
app.use(express.static('public'))

//   *************** GET REQUEST"S ******************************************

app.get('/', (req, res) => {

    res.render('index')
})
app.get('/index', (req, res) => {

    res.render('index')
})
app.get('/createClient', (req, res) => {

    res.render('createClient')
})
app.get('/createDirectory', (req, res) => {

    res.render('createDirectory')
})
app.get('/moveFile', (req, res) => {

    res.render('moveFile')
})
app.get('/deleteFile', (req, res) => {

    res.render('delete')
})

// ***************************** END of GET REQUEST****************************************

//  **************************** create Clien_ID ****************************************** 

app.post('/createClient', urlEcodedParser, (req, res) => {

    fs.access("./clients/" + req.body.clientId, function (error) {
        if (error) {

            fs.mkdir('./clients/' + req.body.clientId, function (err) {
                if (err) {
                    const data = req.body
                    res.render('clientFail', { data: data })
                } else {
                    const data = req.body
                    res.render('clientSuccess', { data: data })
                }
            })
        } else {
            const data = req.body
            res.render('clientFail', { data: data })
        }
    })
})

//  **************************** END - create Clien_ID **************************************** 

//  **************************** create Sub_Directories ***************************************
app.post('/createDirectory', urlEcodedParser, (req, res) => {


    fs.access("./clients/" + req.body.clientId + '/' + req.body.dir, function (error) {
        if (error) {

            const data = req.body
            res.render('failDirectory1', { data: data })

        } else {
            fs.mkdir('./clients/' + req.body.clientId + '/' + req.body.dir, function (err) {
                if (err) {

                    const data = req.body
                    res.render('failDirectory', { data: data })

                } else {
                    const data = req.body
                    res.render('successDirectory', { data: data })
                }
            })

        }
    })

})
//  **************************** END - Sub_Directories ****************************************** 

//  **************************** start moveFile ************************************************* 

app.post('/moveFile', urlEcodedParser, (req, res) => {

    if (req.files) {

        let file = req.files.file
        let fileName = file.name

        file.mv("./clients/" + req.body.clientId + "/" + req.body.dir + "/" + fileName, (err) => {
            if (err) {
                const dat = req.body
                res.render('failFile')
            } else {
                const data = req.body
                res.render('fileSuccess', { data: data, file: file })

            }
        })
    }
})
//  **************************** END - moveFile ************************************************* 

//  **************************** Start Delete Files ********************************************* 

app.post('/deleteFile', urlEcodedParser, (req, res) => {


    fs.access("./clients/" + req.body.clientId + '/' + req.body.dir, function (error) {
        if (error) {
            const data = req.body
            res.render('deleteFail3', { data: data })
        } else {
            fs.access("./clients/" + req.body.clientId + '/' + req.body.dir, function (error) {
                if (error) {
                    const data = req.body
                    res.render('deleteFail2', { data: data })
                } else {

                    fs.unlink('./clients/' + req.body.clientId + '/' + req.body.dir + '/' + req.body.inputFile, (err) => {
                        if (err) {
                            const data = req.body
                            res.render('deleteFail', { data: data })
                        } else {
                            const data = req.body
                            res.render('successDelete', { data: data })
                        }
                    })
                }
            })

        }
    })
})


//  **************************** End Delete Files ***********************************************

app.listen(5006)