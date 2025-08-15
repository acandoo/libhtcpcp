import http from 'node:http'

import * as HTTP_CODES from './http-codes.ts'
import { type PotOptions, type PotOptionsBase, type PotTypes } from './types.ts'

export class HTCPCPServer<T extends PotTypes = PotTypes> {
  listen: http.Server['listen']
  paths: Array<`/${string}`> = ['/']
  capabilities: Set<T>
  createCoffeePot?: (args: PotOptionsBase) => void
  createTeapot?: (args: PotOptionsBase) => void
  #server: http.Server

  static readonly HTTP = HTTP_CODES

  constructor()
  constructor(capabilities: T)
  constructor(capabilities: Set<T>)
  constructor(capabilities?: Set<T> | T) {
    // Normalize overload to Set
    this.capabilities = capabilities
      ? capabilities instanceof Set
        ? capabilities
        : new Set([capabilities])
      : (new Set(['coffee', 'tea']) as Set<T>)

    if (this.capabilities.size === 0) {
      throw new Error('You must specify at least one capability')
    }

    for (const capability of this.capabilities) {
      switch (capability) {
        case 'coffee':
          this.createCoffeePot = (args) =>
            this.#createPot({ type: 'coffee', ...args })
          break
        case 'tea':
          this.createTeapot = (args) =>
            this.#createPot({ type: 'tea', ...args })
      }
    }

    this.#server = http.createServer((req, res) => {
      // implement RFC 2324 first
      if (
        this.capabilities.size === 1 &&
        this.capabilities.has('coffee' as T)
      ) {
        switch (req.method) {
          case 'GET':
            break

          // POST requests are deprecated; fall over to BREW
          case 'POST':
          case 'BREW':
            break

          case 'PROPFIND':
            break
          case 'WHEN':
            break
          default:
            res
              .writeHead(HTCPCPServer.HTTP.METHOD_NOT_ALLOWED, {
                // TODO add proper headers
              })
              .end()
        }
      }
    })

    this.#server.on('request', () => {})
    this.listen = this.#server.listen
  }

  #createPot<T extends PotTypes>(opts: PotOptions<T>): void {}
}

// do you even *tree shake*, bro?
export const createHTCPCPServer = (
  ...args: ConstructorParameters<typeof HTCPCPServer>
) => new HTCPCPServer(...args)
