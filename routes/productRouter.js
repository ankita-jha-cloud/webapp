// import controllers review, products
const productController = require('../controllers/productController.js')



// router
const router = require('express').Router()


// use routers
router.post('/', productController.addProduct)

// Products router
router.get('/:id', productController.getOneProduct)


router.put('/:id', productController.updateacc)



module.exports = router