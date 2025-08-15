import { type IncomingMessage, type ServerResponse } from 'node:http'

export type PotTypes = 'coffee' | 'tea'

export type PotOptionsBase = {
  acceptedAdditions?: {
    milk:
      | 'Cream'
      | 'Half-and-half'
      | 'Whole-milk'
      | 'Part-Skim'
      | 'Skim'
      | 'Non-Dairy'
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
