import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { RestCountriesRepository } from "../src/repository"

global.fetch = vi.fn()

function createResponse(data) {
    return { json: () => Promise.resolve(data) }
}

const mockCountries = [
    {"flags":{"png":"https://flagcdn.com/w320/cy.png","svg":"https://flagcdn.com/cy.svg","alt":"The flag of Cyprus has a white field, at the center of which is a copper-colored silhouette of the Island of Cyprus above two green olive branches crossed at the stem."},"name":{"common":"Cyprus","official":"Republic of Cyprus","nativeName":{"ell":{"official":"Δημοκρατία της Κύπρος","common":"Κύπρος"},"tur":{"official":"Kıbrıs Cumhuriyeti","common":"Kıbrıs"}}},"population":1207361,"continents":["Europe"]},
    {"flags":{"png":"https://flagcdn.com/w320/va.png","svg":"https://flagcdn.com/va.svg","alt":"The flag of Vatican City is square shaped. It is composed of two equal vertical bands of yellow and white, with national coat of arms centered in the white band. The national coat of arms comprises the Papal Tiara superimposed on two crossed keys."},"name":{"common":"Vatican City","official":"Vatican City State","nativeName":{"ita":{"official":"Stato della Città del Vaticano","common":"Vaticano"},"lat":{"official":"Status Civitatis Vaticanæ","common":"Vaticanæ"}}},"population":451,"continents":["Europe"]},
    {"flags":{"png":"https://flagcdn.com/w320/er.png","svg":"https://flagcdn.com/er.svg","alt":"The flag of Eritrea comprises three triangles — a large red isosceles triangle with its base spanning the hoist end and its apex at the midpoint on the fly end, and a green and blue right-angled triangle above and beneath the red triangle. On the hoist side of the red triangle is a golden vertical olive branch encircled by a golden olive wreath."},"name":{"common":"Eritrea","official":"State of Eritrea","nativeName":{"ara":{"official":"دولة إرتريا","common":"إرتريا‎"},"eng":{"official":"State of Eritrea","common":"Eritrea"},"tir":{"official":"ሃገረ ኤርትራ","common":"ኤርትራ"}}},"population":5352000,"continents":["Africa"]}
]

const expectedRegions = [
    { name: 'Africa', population: 5352000 },
    { name: 'Europe', population: 1207812 }
]

const expectedEurope = [
    { name: 'Cyprus', population: 1207361, flag: 'https://flagcdn.com/cy.svg' },
    { name: 'Vatican City', population: 451, flag: 'https://flagcdn.com/va.svg' }
]

describe('Repository should', () => {
    let sut: RestCountriesRepository

    beforeEach(() => {
        vi.useFakeTimers()
        sut = new RestCountriesRepository()
    })

    afterEach(() => {
        localStorage.clear()
        vi.useRealTimers()
    })

    it('return from localStorage when exist and its valid', async () => {
        vi.setSystemTime(new Date(2024, 11, 31))
        localStorage.setItem(
            'pd-data', 
            JSON.stringify({ date: new Date(2024, 11, 30).getTime(), countries: mockCountries })
        )


        const regions = await sut.getRegionsData()
        const europe = await sut.getRegionData('Europe')


        expectedRegions.forEach(
            expectation => expect(regions).toContainEqual(expectation) 
        )
        expectedEurope.forEach(
            expectation => expect(europe).toContainEqual(expectation) 
        )
    })

    it('makes GET request to an API when data is outdated (> 30 days)', async () => {
        vi.setSystemTime(new Date(2024, 11, 31))
        localStorage.setItem(
            'pd-data', 
            JSON.stringify({ date: new Date(2024, 10, 31).getTime(), countries: 'unused' })
        )
        fetch.mockResolvedValue(createResponse(mockCountries))


        const regions = await sut.getRegionsData()
        const europe = await sut.getRegionData('Europe')


        expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all?fields=name,flags,population,continents')
        expectedRegions.forEach(
            expectation => expect(regions).toContainEqual(expectation) 
        )
        expectedEurope.forEach(
            expectation => expect(europe).toContainEqual(expectation) 
        )
        const onStorage = JSON.parse(localStorage.getItem('pd-data'))
        expect(onStorage.date).toEqual(new Date(2024, 11, 31).getTime())
        mockCountries.forEach(
            expectation => expect(onStorage.countries).toContainEqual(expectation) 
        )
    })

    it('makes GET request to an API when no cache data', async () => {
        vi.setSystemTime(new Date(2024, 11, 31))
        fetch.mockResolvedValue(createResponse(mockCountries))


        const regions = await sut.getRegionsData()
        const europe = await sut.getRegionData('Europe')


        expectedRegions.forEach(
            expectation => expect(regions).toContainEqual(expectation) 
        )
        expectedEurope.forEach(
            expectation => expect(europe).toContainEqual(expectation) 
        )
        const onStorage = JSON.parse(localStorage.getItem('pd-data'))
        expect(onStorage.date).toEqual(new Date(2024, 11, 31).getTime())
        mockCountries.forEach(
            expectation => expect(onStorage.countries).toContainEqual(expectation) 
        )
    })
})