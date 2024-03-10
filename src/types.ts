export interface RestCountriesData {
    flags: Flags
    name: Name
    population: number
    continents: string[]
}

export interface Flags {
    png: string
    svg: string
    alt: string
}

export interface Name {
    common: string
    official: string
    nativeName: NativeName
}

export interface NativeName {
    ell: Ell
    tur: Tur
}

export interface Ell {
    official: string
    common: string
}

export interface Tur {
    official: string
    common: string
}