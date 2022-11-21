import { buildSchema } from "graphql"

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String
        price: Float
        description: String
        thumbnail: String
        timestamp: String
        code: String
        stock: Int
        qty: Int
    }
    input ProductInput {
        title: String
        price: String
        description: String
        thumbnail: String
        timestamp: String
        code: String
        stock: String
        qty: String
    }
    type Query {
        getProduct(id: ID!): Product
        getProducts(key: String, value: String): [Product]
    }
    type Mutation {
        createProduct(data: ProductInput): Product
        updateProduct(id: ID!, data: ProductInput): Product
        deleteProduct(id: ID!): Product
    }
`)

export { schema }