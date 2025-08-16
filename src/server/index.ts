import http from 'node:http'

import * as HTTPCodes from '../http-codes.ts'
import {
  type Endpoints,
  type Paths,
  type PotMethod,
  type PotOptions,
  type PotOptionsBase,
  type PotTypes
} from '../types.ts'

export class HTCPCPServer<T extends PotTypes = PotTypes> {
  listen: http.Server['listen']
  get paths() {
    return Object.keys(this.#endpoints) as Paths[]
  }
  capabilities: Set<T>
  createCoffeePot:
    | ('coffee' extends T ? (args: PotOptionsBase) => this : undefined)
    | undefined
  createTeapot:
    | ('tea' extends T ? (args: PotOptionsBase) => this : undefined)
    | undefined
  #server: http.Server
  #endpoints: Endpoints = {}

  /** Creates a server with default capabilities ('coffee' and 'tea'). */
  constructor()

  /**
   * Creates a server with a single capability.
   *
   * @param capability - The type of beverage that can be brewed.
   */
  constructor(capability: T)

  /**
   * Creates a server with a set of capabilities.
   *
   * @param capabilities - The types of beverages that can be brewed.
   */
  constructor(capabilities: Set<T>)
  constructor(capabilities?: Set<T> | T) {
    // Normalize overload to Set
    this.capabilities = capabilities
      ? capabilities instanceof Set
        ? capabilities
        : new Set([capabilities])
      : (new Set(['coffee', 'tea']) as Set<T>)

    if (this.capabilities.size === 0) {
      throw Error('You must specify at least one capability')
    }

    for (const capability of this.capabilities) {
      const potFn = (args: PotOptionsBase) =>
        this.createPot({ type: capability, ...args })
      if (capability === 'coffee') {
        this.createCoffeePot = potFn as 'coffee' extends T
          ? (args: PotOptionsBase) => this
          : undefined
      }
      if (capability === 'tea') {
        this.createTeapot = potFn as 'tea' extends T
          ? (args: PotOptionsBase) => this
          : undefined
      }
    }

    this.#server = http.createServer(this.#serverFn)
    this.listen = this.#server.listen
  }

  #serverFn(req: http.IncomingMessage, res: http.ServerResponse): void {
    // implement RFC 2324 first
    if (this.capabilities.size === 1 && this.capabilities.has('coffee' as T)) {
      if (
        req.method &&
        ['GET', 'POST', 'BREW', 'PROPFIND', 'WHEN'].includes(req.method)
      ) {
        const httpMethod = (
          req.method === 'POST' ? 'BREW' : req.method
        ) as PotMethod
        // compare path to internal object paths, execute appropriate brew function
        for (const [path, methods] of Object.entries(this.#endpoints)) {
          /**
           * NOTE: according to section
           * {@link https://datatracker.ietf.org/doc/html/rfc2068#section-5.1.2 | 5.1.2}
           * of the HTTP 1.1 specification, the absolute URI MUST be accepted
           * and parsed accordingly.
           */
          if (
            req.url &&
            [path, `http://${process.env.HOST ?? 'localhost'}${path}`].includes(
              req.url
            )
          ) {
            methods[httpMethod](req, res)
          }
        }
      } else {
        res
          .writeHead(HTTPCodes.METHOD_NOT_ALLOWED, {
            // TODO add proper headers
          })
          .end()
      }
    }
  }

  createPot(opts: PotOptions<T>): typeof this {
    // dummy
    this.#endpoints = {
      ...this.#endpoints,
      '/': {
        GET: () => {},
        BREW: () => {},
        WHEN: () => {},
        PROPFIND: () => {}
      }
    }
    return this
  }
}
