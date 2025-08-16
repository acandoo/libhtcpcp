import { type IncomingMessage, type ServerResponse } from 'node:http'

export type PotTypes = 'coffee' | 'tea'

export type PotOptionsBase = {
  /**
   * The name of the coffee pot. This is not exposed to clients in the protocol,
   * but nevertheless is useful to have for server-side enumeration.
   */
  name?: string
  /**
   * A description of the coffee pot. This is not exposed to clients in the
   * protocol, but nevertheless is useful to have for server-side enumeration.
   */
  description?: string
  acceptedAdditions?: {
    milk?:
      | 'Cream'
      | 'Half-and-half'
      | 'Whole-milk'
      | 'Part-Skim'
      | 'Skim'
      | 'Non-Dairy'
    syrup?: 'Vanilla' | 'Almond' | 'Raspberry' | 'Chocolate'
    /**
     * @remarks
     *   Note: specific sweeteners are not specified in RFC 2324, nor in RFC 7168,
     *   nor in any accepted errata in either of the specifications.
     *   Additionally, the purpose of this option seems to be in conflict with
     *   the sugar-type addition type introduced explicitly with types in RFC
     *   7168.
     */
    sweetener?: string
    /**
     * @remarks
     *   Note: specific spices are not specified in RFC 2324, nor in RFC 7168, nor
     *   in any accepted errata in either of the specifications. The additional
     *   type annotations are gathered from the rejected
     *   {@link https://www.rfc-editor.org/errata/eid8160 | RFC Errata 8160}.
     */
    spice?: string | 'Chicory' | 'Cocoa' | 'Cinnamon' | 'Cardamom'
    alcohol?: 'Whisky' | 'Rum' | 'Kahlua' | 'Aquavit'
  }
  // TODO
}

export type PotOptions<T extends PotTypes> = PotOptionsBase & { type: T }

export type PotMethod = 'GET' | 'BREW' | 'PROPFIND' | 'WHEN'
export type DeprecatedPotMethod = 'POST'
export type AllowedPotMethod = PotMethod | DeprecatedPotMethod

export type RequestFn = (req: IncomingMessage, res: ServerResponse) => void
export type PotRecord = Record<PotMethod, RequestFn>
export type Paths = `/${string}`
export type Endpoints = Record<Paths, PotRecord>
