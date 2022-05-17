const { WebSocketLink } = require('apollo-link-ws')
const { SubscriptionClient } = require('subscriptions-transport-ws')
const { ApolloClient, InMemoryCache, gql } = require( '@apollo/client')
const ws = require('ws')

// Your API key:
const API_KEY = 'YOUR_API_KEY'

// The ID of the workspace you're subscribing to:
const WORKSPACE_ID = 'YOUR_WORKSPACE_ID'

// Initialize the Websockets client
const wsClient = new ApolloClient({
  link: new WebSocketLink(new SubscriptionClient('wss://api.dayswaps.com/2/graphql', {
  reconnect: true,
  connectionParams: {
    authorization: 'Bearer ' + API_KEY
  }
}, ws)),
  cache: new InMemoryCache({
    addTypename: false
  })
})

// Subscribe to shift changes
console.log('Subscribing to shift changes ...')
wsClient.subscribe({
  query: gql`
  subscription (
    $workspaceId: ID!
  ) {
    shifts (workspace: $workspaceId) {
      type
      obj {
        id
        userId
        workTime
        period {
          start
          end
        }
        pauses {
          start
          duration
        }
        note
      }
    }
  }`,
  variables: {
    workspaceId: WORKSPACE_ID
  }
}).subscribe((res) => {
  const obj = res.data.shifts.obj
  const updType = res.data.shifts.type
  console.log('Updated shift (' + updType + '):')
  console.log(obj)
})

// Subscribe to unavailability changes
console.log('Subscribing to unavailability changes ...')
wsClient.subscribe({
  query: gql`
  subscription (
    $workspaceId: ID!
  ) {
    unavailabilities (workspace: $workspaceId) {
      type
      obj {
        id
        userId
        type
        categoryId
        period {
          start
          end
        }
        text
      }
    }
  }`,
  variables: {
    workspaceId: WORKSPACE_ID
  }
}).subscribe((res) => {
  const obj = res.data.unavailabilities.obj
  const updType = res.data.unavailabilities.type
  console.log('Updated unavailability (' + updType + '):')
  console.log(obj)
})
