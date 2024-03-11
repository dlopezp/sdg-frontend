import { RestCountriesData } from "./types";

export interface RegionData {
  name: string;
  population: number;
}

export interface CountryData {
  name: string;
  flag: string;
  population: number;
}

const ONE_HOUR = 60 * 60 * 1000;
const ONE_MONTH = 30 * 24 * ONE_HOUR;

export class RestCountriesRepository {
  private regionsData: RegionData[] | null = null;
  private byRegionsData: Record<string, CountryData[]> | null = null;
  private timeout: NodeJS.Timeout | null = null;

  public async getRegionsData(): Promise<RegionData[]> {
    if (this.regionsData) return this.regionsData;

    const { regionsData } = await this.build();
    return regionsData;
  }

  public async getRegionData(regionName: string): Promise<CountryData[]> {
    if (this.byRegionsData) return this.byRegionsData[regionName.toLowerCase()];

    const { byRegionsData } = await this.build();
    return byRegionsData[regionName.toLowerCase()];
  }

  private async build(): Promise<{
    regionsData: RegionData[];
    byRegionsData: Record<string, CountryData[]>;
  }> {
    const fromStorage = this.read();
    if (fromStorage) {
      this.save(fromStorage);
      this.processData(fromStorage);
      this.clear();
      return {
        regionsData: this.regionsData as RegionData[],
        byRegionsData: this.byRegionsData as Record<string, CountryData[]>,
      };
    }

    const fromApi = await this.fetchFromApi();
    this.save(fromApi);
    this.processData(fromApi);
    this.clear();
    return {
      regionsData: this.regionsData as RegionData[],
      byRegionsData: this.byRegionsData as Record<string, CountryData[]>,
    };
  }

  private save(data: RestCountriesData[]): void {
    localStorage.setItem(
      "pd-data",
      JSON.stringify({ date: Date.now(), countries: data }),
    );
  }

  private clear(): void {
    if (this.timeout) return;
    this.timeout = setTimeout(() => {
      this.regionsData = null;
      this.byRegionsData = null;
    }, ONE_HOUR);
  }

  private async fetchFromApi(): Promise<RestCountriesData[]> {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,continents",
    );
    const data: RestCountriesData[] = await response.json();
    return data;
  }

  private read(): RestCountriesData[] | null {
    const cache = localStorage.getItem("pd-data");
    if (!cache) return null;

    const cacheData = JSON.parse(cache);
    const validUntil = cacheData.date + ONE_MONTH;
    const isOutdated = validUntil <= Date.now();
    if (isOutdated) return null;

    return cacheData.countries;
  }

  private processData(data: RestCountriesData[]) {
    const regions: Record<string, RegionData> = {};
    const byRegion: Record<string, CountryData[]> = {};

    data.forEach((country) => {
      country.continents.forEach((continentName) => {
        const continent = regions[continentName] || {
          name: continentName,
          population: 0,
        };
        continent.population += country.population;
        regions[continentName] = continent;

        const countries = byRegion[continentName.toLowerCase()] || [];
        byRegion[continentName.toLowerCase()] = [
          ...countries,
          {
            name: country.name.common,
            flag: country.flags.svg,
            population: country.population,
          },
        ];
      });
    });

    this.regionsData = Object.values(regions);
    this.byRegionsData = byRegion;
  }
}

const repository = new RestCountriesRepository();
export default repository;
