// import controllers review, products
const productController = require('../controllers/productController.js')
const pictureController = require('../controllers/pictureController.js')



// router
const router = require('express').Router()


// use routers
router.post('/account', productController.addProduct)

// Products router
router.get('/account/:id', productController.getOneProduct)


router.put('/account/:id', productController.updateacc);


router.post("/document", pictureController.create_document);

router.get("/documents", pictureController.getdocuments);

router.get("/document/:id", pictureController.get_single_document);

router.delete("/document/:id", pictureController.delete_single_document);



module.exports = router