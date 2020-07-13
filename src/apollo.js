import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag';
import {
    // addItemMutation,
    todoItemsQuery} from './mutationQueries'
export const typeDefs = gql`
    type Item {
        id: ID!
        text: String!
        done: Boolean!
    }

    type Mutation {
        checkItem(id: ID!): Boolean
        addItem(text: String!): Item
    }
`;

const resolvers = {
    Mutation: {
        checkItem: (_, {id}, {cache}) => {
            const data = cache.readQuery({query: todoItemsQuery});
            const currentItem = data.todoItems.find(item => item.id === id);
            currentItem.done = !currentItem.done;
            cache.writeQuery({query: todoItemsQuery, data});
            return currentItem.done;
        },
        addItem: (_, item, {cache}) => {
            console.log('-----------')
            console.log(item, cache)
            const data = cache.readQuery({query: todoItemsQuery})
            console.log(data, '##########')
            data.todoItems.push({id: "111", text: item.text, done: false, __typename: "Item"})
            console.log("NEW TODO: ", data)
            cache.writeQuery({query: todoItemsQuery, data});
            console.log(data)
            return data.todoItems
        }
    }
}


// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3020/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    typeDefs,
    link: httpLink,
    cache,
    resolvers
})

cache.writeData({
    data: {
        todoItems: [
            {
                __typename: 'Item',
                id: 'dqdBHJGgjgjg',
                text: 'test',
                done: true,
            },
        ],
    },
});

export default apolloClient
