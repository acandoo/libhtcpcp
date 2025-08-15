# libhtcpcp

libhtcpcp is a modern, strongly typed TypeScript library for implementing the Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0) as defined in [RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324), as well as its addendum HTCPCP-TEA as defined in [RFC 7168](https://datatracker.ietf.org/doc/html/rfc7168).

While this library tries to be unopinionated in its API, certain assumptions are made in the protocol for the gaps left behind. For instance, rejected [RFC Errata 8160](https://www.rfc-editor.org/errata/eid8160) is incorporated as a type definition (excluding the 'Sugar' option for sweetener-type).
