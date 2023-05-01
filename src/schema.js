const { gql } = require('apollo-server-express');

module.exports = gql`
    type Book {
        id: ID!
        title: String!
        author: User!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        books: [Book!]!
    }
    type UserData {
        username: String
        sex: String
        name: String
        lastName: String
        phoneNumber: String
        street: String
        number: String
        city: String
        postalCode: String
        country: String
        creditcardName: String
        creditcardLastName: String
        creditcardNumber: String
        pushNotifications: String
        emailUpdates: String
    }
    type Cocktail {
        id: ID!
        name: String
        description: String
        price: String
        stock: String
        ingredients: [String]
        juice: [String]
        garnish: [String]
        tags: [String]
        images: [String]
        tutorialvideo: String
        difficulty: String
        steps: [String]
        productvideo: String
        alcoholpercentage: String
        ingredientimages: [String]
    }
    type Query {
        hello: String,
        books: [Book!]!,
        book(id: ID!): Book!,
        cocktails: [Cocktail!]!,
        userData: [UserData!]!,
        orders: [Order!]!,
    }
    type Order {
        id: ID!
        cartitems: [CartItem]
        orderid: String!
        total: String!
        deliveryoption: String!
    }
    type CartItem {
        id: ID
        image: String
        title: String
        size: String
        quantity: String
        itemprice: String
        totalprice: String
    }
    input cartItemInput {
        id: ID
        image: String
        title: String
        size: String
        quantity: String
        itemprice: String
        totalprice: String
    }
    type Mutation {
        addOrder(cartitems: [cartItemInput]!, orderid: String!, total: String!, deliveryoption: String!): Order!
        addBook(title: String!, author: String!): Book!
        updateBook(id: ID!, title: String!, author: String!): Book!
        deleteBook(id: ID!): Boolean!
        addCocktail(description: String!, garnish: [String]!, ingredients: [String]!, juice: [String]!, name: String!, price: String!, stock: String!, tags: [String]!, steps: [String]!, difficulty: String!, images: [String]!, productVideo: String!, tutorialVideo: String! ): Cocktail!
        addUserData(username: String!, sex: String!, name: String!, lastName: String!, phoneNumber: String!, street: String!, number: String!, city: String!, postalCode: String!, country: String!, creditcardName: String!, creditcardLastName: String!, creditcardNumber: String!, pushNotifications: String!, emailUpdates: String!): UserData!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
    }
`;
