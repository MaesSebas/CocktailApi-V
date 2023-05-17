const { gql } = require('apollo-server-express');

module.exports = gql`
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
        type: String
        glass: String
    }
    type User {
        id: ID
        username: String
        email: String
        password: String
        role: String
        userdata: UserData
        cartitems: [CartItem]
        orders: [Order]
        uploadedPictures: [Photo]
    }

    type Photo {
        name: String!
    }
    
    type UserData {
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
    
    type CartItem {
        image: String
        title: String
        size: String
        quantity: String
        itemprice: String
        totalprice: String
    }

    input CartItemInput {
        image: String!
        title: String!
        size: String!
        quantity: String!
        itemprice: String!
        totalprice: String!
    }
      
    input OrderInput {
        date: String!
        orderMethod: String!
        orderId: String!
        totalprice: String!
        items: [CartItemInput]!
    }
    
    type Order {
        date: String
        orderMethod: String
        orderId: String
        totalprice: String
        items: [CartItem]
    }

    type Query {
        cocktails: [Cocktail!]!,
        user: [User!]!
        getUserByUsername(username: String!): User,
    }

    input userDataTest {
        sex: String!
        name: String!
        lastName: String!
        phoneNumber: String!
        street: String!
        number: String!
        city: String!
        postalCode: String!
        country: String!
        creditcardName: String!
        creditcardLastName: String!
        creditcardNumber: String!
        pushNotifications: String!
        emailUpdates: String!
    }

    input UserDataInput {
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

    type Mutation {
        createUser (
            username: String!
            password: String!
            userData: userDataTest!
            cartitems: [CartItemInput]!
            orders: [OrderInput]!
            uploadedPictures: [String]!
        ) : User!

        addOrder (
            username: String!
            date: String!
            orderMethod: String!
            orderId: String!
            totalprice: String!
            items: [CartItemInput]!
        ): Order!

        addPhoto(
            username: String!
            filename: String!
        ): Boolean!

        deletePhoto(
            username: String!
            filename: String!
        ) : Boolean!

        signIn(
            username: String, 
            email: String, 
            password: String!
        ): String!

        editData(
            username: String!, 
            newData: UserDataInput!
        ): User!

        addCocktail(
            description: String!, 
            garnish: [String]!, 
            ingredients: [String]!, 
            juice: [String]!, 
            name: String!, 
            price: String!, 
            stock: String!, 
            tags: [String]!, 
            steps: [String]!, 
            difficulty: String!, 
            images: [String]!, 
            productVideo: String!, 
            tutorialVideo: String! 
        ): Cocktail!
    }
`;
