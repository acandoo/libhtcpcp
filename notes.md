# API

```ts
const SERVER_PORT = 8080
const server = createHTCPCPServer() // without specifier, defaults to coffee and tea

const coffee1 = server.createPot({
  type: 'coffee',
  acceptedAdditions: {
    milk: ['Cream', 'Half-and-Half'],
    sweetener: ['Saccharine']
    // etc etc.
  },
  metadata: { // for PROPFIND method; undefined in spec. use XML?
    size: '24oz'
  }
  get(req, res) {
    // not properly defined in spec, do whatever i guess
  },
  brew() {

  }
})

console.log(server.getPots()) // [ '/' ]

const tea1 = server.createPot({
  type: 'tea',
  acceptedAdditions: {
    sweetener: ['Saccharine'],
    sugar: ['Stevia']
    // etc etc.
  },
  get(req, res) {
    // not properly defined in spec, do whatever i guess
  }
})

console.log(server.getPots()) // [ '/pot-0', '/pot-1' ]

server.listen(SERVER_PORT, () => console.log(`server on port ${SERVER_PORT}`))
```

# Combined specs

### definitions

- **machine:** an encapsulated entity consisting of one or more pots that serves HTCPCP over one host
- **pot:** an individual endpoint that can be used to brew coffee or tea

### `/`

1. if media type is 'message/teapot' then show list of endpoints in Alternates, return 300 Multiple Options
2. if media type is 'message/coffeepot' AND the machine has only one coffee pot then brew coffee,
  1. if all goes right 200 OK and continue to next
  2. if multiple coffee pots show list of endpoints in Alternates
3. if media type is 'message/coffeepot' AND the machine has multiple coffee pots then show list of endpoints in Alternates, if all goes right 200 OK

### assumptions made

Rejected [RFC Errata 8160](https://www.rfc-editor.org/errata/eid8160) is incorporated as a type definition (excluding the 'Sugar' option for sweetener-type).

Pots are assigned zero-indexed (as implied by section 2.1.1 of rfc 7168), and in the case of a single pot of type coffee, it is assigned `/`

### future spec ideas

allow GET request for pot to follow section 6 of rfc 2324

add blockchain verifiability with "proof of taste" using open hardware whose uuids are signed and attached to sigstore
consensus metric: over 50% like, then request goes through; under 50% like; HTTP 403 Forbidden
