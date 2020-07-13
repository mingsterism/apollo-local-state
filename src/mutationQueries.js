import gql from "graphql-tag";

const todoItemsQuery = gql` {
    todoItems @client {
        id
        text
        done
    }
}`

const checkItemMutation = gql` 
    mutation($id: ID!) {
    checkItem(id: $id) @client
}`

const addItemMutation = gql` 
    mutation($todo: String!) {
        addItem(text: $todo) @client
    }
`
export {
    todoItemsQuery,
    checkItemMutation,
    addItemMutation
}
