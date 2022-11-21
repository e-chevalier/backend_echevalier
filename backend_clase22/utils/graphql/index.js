import { productsContainer, productsMemory } from '../../daos/index.js'
import { graphqlHTTP } from "express-graphql"
import { schema } from './schema.js'
class Product {

    constructor(id, { title, price, description, thumbnail, timestamp, code, stock, qty }) {
        this.id = id
        this.title = title
        this.price = price
        this.description = description
        this.thumbnail = thumbnail
        this.timestamp = timestamp
        this.code = code
        this.stock = stock
        this.qty = qty
    }
}

async function getProduct({ id }) {
    try {
        let products = [await productsMemory.getById(id)]
        if (products.length == 0) {
            throw new Error('Product not found whit id: ' + id)
        }
        return products[0]
    } catch (error) {
        throw new Error(error)
    }

}

async function getProducts({ key, value }) {

    try {
        let products = await productsMemory.getAll()

        if (key && value) {
            return products.filter(p => p[key] == value)
        } else {
            return products
        }

    } catch (error) {
        throw new Error(error)
    }

}



//mutation{createProduct(data: { title: "Pera", description: "Pera dulce y fresca para comer en este verano.", code: "SummerFruit", thumbnail: "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_abacate-128.png", price: "250", stock: "59"}){id}}

async function createProduct({ data }) {
    try {
        // CALL DAO CREATE PRODUCT
        if (Object.keys(data).length !== 0 && !Object.values(data).includes('')) {

            let prodID = await productsMemory.save(data)
            //Save DB
            productsContainer.save(data)

            let newProd = await productsMemory.getById(prodID)
            return newProd

        } else {
            throw new Error("Data for newProd incomplete.")
        }

    } catch (error) {
        throw new Error(error)
    }

}

async function updateProduct({ id, data }) {

    try {
        // CALL DAO CREATE PRODUCT
        let exists = await productsMemory.getById(id)

        if (exists) {
            await productsMemory.updateById(id, data)
            //Save to DB
            productsContainer.updateById(id, data)
        } else {
            throw new Error('Product not found whit id: ' + id)
        }

        let newProd = await productsMemory.getById(id)
        return newProd

    } catch (error) {
        throw new Error(error)
    }
}

async function deleteProduct({ id }) {

    try {

        let prodToDelete = await productsMemory.getById(id)
        let index = await productsMemory.deleteById(id)

        if (index >= 0) {
            //DELETE IN DB
            await productsContainer.deleteById(id)
        } else {
            throw new Error('Product not found whit id: ' + id)
        }

        return prodToDelete

    } catch (error) {
        throw new Error(error)
    }
}


const useGraphql = (app) => {

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: {
            getProduct,
            getProducts,
            createProduct,
            updateProduct,
            deleteProduct
        },
        graphiql: true,
    }))


}

/*
EXAMPLES QUERYS

GETPRODUCTS
127.0.0.1:8080/graphql?query={getProducts{id,title, price, description, thumbnail, timestamp, code, stock, qty}}

GETPRODUCTS KEY VALUE
127.0.0.1:8080/graphql?query={getProducts(key: "id", value: "2"){id,title, price, description, thumbnail, timestamp, code, stock, qty}}

GET PRODUCT BY ID
127.0.0.1:8080/graphql?query={getProduct(id: 48){id,title, price, description, thumbnail, timestamp, code, stock, qty}}

CREATE PROD
127.0.0.1:8080/graphql?query=mutation{createProduct(data: { title: "Pera", description: "Pera dulce y fresca para comer en este verano.", code: "SummerFruit", thumbnail: "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_abacate-128.png", price: "250", stock: "59", qty: "0"}){id,title, price, description, thumbnail, timestamp, code, stock, qty}}

DELETE PRODUCT
127.0.0.1:8080/graphql?query=mutation{deleteProduct(id: 54){id,title, price, description, thumbnail, timestamp, code, stock, qty}}

UPDATE PROD
127.0.0.1:8080/graphql?query=mutation{updateProduct(id: 47, data: { title: "Pera LOCA3", description: "Pera dulce y fresca", code: "SummerFruit2", price: "666", stock: "99", qty: "1"}){id,title, price, description, thumbnail, timestamp, code, stock, qty}}

*/

export { useGraphql }

