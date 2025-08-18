import { type IncomingMessage, type ServerResponse } from 'node:http'

/** The types of pots currently supported. */
export type PotTypes = 'coffee' | 'tea'

export type PotOptionsBase<T extends 'milk' | undefined = 'milk'> = {
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
    milk?: Array<
      | 'Cream'
      | 'Half-and-half'
      | 'Whole-milk'
      | 'Part-Skim'
      | 'Skim'
      | 'Non-Dairy'
    >
    syrup?: Array<'Vanilla' | 'Almond' | 'Raspberry' | 'Chocolate'>
    /**
     * @remarks
     *   Note: specific sweeteners are not specified in RFC 2324, nor in RFC 7168,
     *   nor in any accepted errata in either of the specifications.
     *   Additionally, the purpose of this option seems to be in conflict with
     *   the `sugar-type` addition type introduced explicitly with types in RFC
     *   7168.
     */
    sweetener?: Array<string>
    /**
     * @remarks
     *   Note: specific spices are not specified in RFC 2324, nor in RFC 7168, nor
     *   in any accepted errata in either of the specifications. The additional
     *   type annotations are gathered from the rejected
     *   {@link https://www.rfc-editor.org/errata/eid8160 | RFC Errata 8160}.
     */
    spice?: Array<string | 'Chicory' | 'Cocoa' | 'Cinnamon' | 'Cardamom'>
    alcohol?: 'Whisky' | 'Rum' | 'Kahlua' | 'Aquavit'
  }
  brew: (milk: T extends 'milk' ? Promise<void> : undefined) => Promise<void>
  // TODO
}

export type PotOptions<T extends PotTypes> = PotOptionsBase & {
  type: T
}

export type PotMethod = 'GET' | 'BREW' | 'PROPFIND' | 'WHEN'
export const POT_METHODS: PotMethod[] = ['GET', 'BREW', 'PROPFIND', 'WHEN']

export type DeprecatedPotMethod = 'POST'
export type AllowedPotMethod = PotMethod | DeprecatedPotMethod
export const ALLOWED_POT_METHODS: AllowedPotMethod[] = [
  'GET',
  'POST',
  'BREW',
  'PROPFIND',
  'WHEN'
]

/**
 * Accepted pot URIs, following
 * {@link https://www.rfc-editor.org/rfc/inline-errata/rfc2324.html | RFC 2324 with accepted errata}.
 */
export type CoffeeURI =
  | 'koffie' // Afrikaans, Dutch
  | 'q%C3%A6hv%C3%A6' // Azerbaijani
  | '%D9%82%D9%87%D9%88%D8%A9' // Arabic
  | 'akeita' // Basque
  | 'koffee' // Bengali
  | 'kahva' // Bosnian
  | 'kafe' // Bulgarian, Czech
  | 'caf%C3%E9' // Catalan, French, Galician
  | '%E5%92%96%E5%95%A1' // Chinese
  | 'kava' // Croatian
  | 'k%C3%A1va' // Czech
  | 'kaffe' // Danish, Norwegian, Swedish
  | 'coffee' // English
  | 'kafo' // Esperanto
  | 'kohv' // Estonian
  | 'kahvi' // Finnish
  | '%4Baffee' // German
  | '%CE%BA%CE%B1%CF%86%CE%AD' // Greek
  | '%E0%A4%95%E0%A5%8C%E0%A4%AB%E0%A5%80' // Hindi
  | '%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC' // Japanese
  | '%EC%BB%A4%ED%94%BC' // Korean
  | '%D0%BA%D0%BE%D1%84%D0%B5' // Russian
  | '%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F' // Thai
export const COFFEE_URIS: CoffeeURI[] = [
  'koffie', // Afrikaans, Dutch
  'q%C3%A6hv%C3%A6', // Azerbaijani
  '%D9%82%D9%87%D9%88%D8%A9', // Arabic
  'akeita', // Basque
  'koffee', // Bengali
  'kahva', // Bosnian
  'kafe', // Bulgarian, Czech
  'caf%C3%E9', // Catalan, French, Galician
  '%E5%92%96%E5%95%A1', // Chinese
  'kava', // Croatian
  'k%C3%A1va', // Czech
  'kaffe', // Danish, Norwegian, Swedish
  'coffee', // English
  'kafo', // Esperanto
  'kohv', // Estonian
  'kahvi', // Finnish
  '%4Baffee', // German
  '%CE%BA%CE%B1%CF%86%CE%AD', // Greek
  '%E0%A4%95%E0%A5%8C%E0%A4%AB%E0%A5%80', // Hindi
  '%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC', // Japanese
  '%EC%BB%A4%ED%94%BC', // Korean
  '%D0%BA%D0%BE%D1%84%D0%B5', // Russian
  '%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F' // Thai
]

export type RequestFn = (req: IncomingMessage, res: ServerResponse) => void
export type PotRecord = Record<PotMethod, RequestFn>
export type Paths = `/${string}`
export type Endpoints = Record<Paths, PotRecord>
