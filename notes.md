# API

const server = createHTCPCPServer('coffee')

pot.

# Combined specs

### definitions

machine: an encapsulated entity consisting of one or more pots that serves HTCPCP over one host
pot: an individual endpoint that can be used to brew coffee or tea

### `/`

if media type is 'message/teapot' then show list of endpoints in Alternates, return 300 Multiple Options
if media type is 'message/coffeepot' AND the machine has only one pot then brew coffee, if all goes right 200 OK
if media type is 'message/coffeepot' AND the machine has multiple pots, return 300 Multiple Options

4. The "message/coffeepot" media type

   The entity body of a POST or BREW request MUST be of Content-Type
   "message/coffeepot". Since most of the information for controlling
   the coffee pot is conveyed by the additional headers, the content of
   "message/coffeepot" contains only a coffee-message-body:

### future spec ideas

add blockchain verifiability with "proof of taste" using open hardware whose uuids are signed and attached to sigstore
consensus metric: over 50% like, then request goes through; under 50% like; HTTP 403 Forbidden
