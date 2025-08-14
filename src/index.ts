import http from 'node:http'

export class HTCPCPServer {
  // HTTP codes

  static readonly OK = 200

  /**
   * This error code is for TEA-capable pots only.
   *
   * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
   *
   * A BREW request to the "/" URI, as defined in Section 2.1.1, will return an
   * Alternates header indicating the URIs of the available varieties of tea to
   * brew. It is RECOMMENDED that this response be served with a status code of
   * 300, to indicate that brewing has not commenced and further options must be
   * chosen by the client.
   */
  static readonly MULTIPLE_OPTIONS = 300

  /**
   * This error code is for TEA-capable pots only.
   *
   * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
   *
   * Services that implement the Accept-Additions header field MAY return a 403
   * status code for a BREW request of a given variety of tea, if the service
   * deems the combination of additions requested to be contrary to the
   * sensibilities of a consensus of drinkers regarding the variety in
   * question.
   */
  static readonly FORBIDDEN = 403

  /**
   * As per {@link https://datatracker.ietf.org/doc/html/rfc2324|RFC 2324}:
   *
   * This response code MAY be returned if the operator of the coffee pot cannot
   * comply with the Accept-Addition request. Unless the request was a HEAD
   * request, the response SHOULD include an entity containing a list of
   * available coffee additions.
   */
  static readonly NOT_ACCEPTABLE = 406

  /**
   * As per {@link https://datatracker.ietf.org/doc/html/rfc2324|RFC 2324}:
   *
   * Any attempt to brew coffee with a teapot should result in the error code
   * "418 I'm a teapot". The resulting entity body MAY be short and stout.
   */
  static readonly IM_A_TEAPOT = 418

  /**
   * This error code is for TEA-capable pots only.
   *
   * As per {@link https://datatracker.ietf.org/doc/html/rfc7168|RFC 7168}:
   *
   * TEA-capable pots that are not provisioned to brew coffee may return either
   * a status code of 503, indicating temporary unavailability of coffee, or a
   * code of 418 as defined in the base HTCPCP specification to denote a more
   * permanent indication that the pot is a teapot.
   */
  static readonly COFFEE_UNAVAILABLE = 503

  #server
  listen

  constructor(capabilities: ReadonlySet<'coffee' | 'tea'>) {
    if (capabilities.size === 0)
      throw new Error('You must specify at least one capability')

    this.#server = http.createServer((req, res) => {
      // implement RFC 2324 first
      if (capabilities.size === 1 && capabilities.has('coffee')) {
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
          // Error out
          // TODO
        }
      }
    })

    this.#server.on('request', () => {})
    this.listen = this.#server.listen
  }

  static readonly coffeePot = () => new HTCPCPServer(new Set(['coffee']))
  static readonly teapot = () => new HTCPCPServer(new Set(['tea']))
  static readonly combo = () => new HTCPCPServer(new Set(['coffee', 'tea']))
}

export const createHTCPCPServer = (
  ...args: ConstructorParameters<typeof HTCPCPServer>
) => new HTCPCPServer(...args)
