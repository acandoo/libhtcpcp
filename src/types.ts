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

export type AllowedPotMethods = 'GET' | 'POST' | 'BREW' | 'PROPFIND' | 'WHEN'

// export type Endpoints = Record<`/${string}`, AllowedPotMethods[]>
