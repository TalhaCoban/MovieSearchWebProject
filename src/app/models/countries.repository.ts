import { Injectable } from "@angular/core"

export interface Country {
    iso_3166_1: string,
    english_name: string,
    native_name: string
}

@Injectable({
    providedIn: "root"
})
export class CountryRepository {
    countries: Country[] = [
        { iso_3166_1: "AE", english_name: "United Arab Emirates", native_name: "Birleşik Arap Emirlikleri" },
        { iso_3166_1: "AF", english_name: "Afghanistan", native_name: "Afganistan" },
        { iso_3166_1: "AL", english_name: "Albania", native_name: "Arnavutluk" },
        { iso_3166_1: "AR", english_name: "Argentina", native_name: "Arjantin" },
        { iso_3166_1: "AT", english_name: "Austria", native_name: "Avusturya" },
        { iso_3166_1: "AU", english_name: "Australia", native_name: "Avustralya" },
        { iso_3166_1: "AZ", english_name: "Azerbaijan", native_name: "Azerbaycan" },
        { iso_3166_1: "BE", english_name: "Belgium", native_name: "Belçika" },
        { iso_3166_1: "BG", english_name: "Bulgaria", native_name: "Bulgaristan" },
        { iso_3166_1: "BR", english_name: "Brazil", native_name: "Brezilya" },
        { iso_3166_1: "CA", english_name: "Canada", native_name: "Kanada" },
        { iso_3166_1: "CH", english_name: "Switzerland", native_name: "İsviçre" },
        { iso_3166_1: "CL", english_name: "Chile", native_name: "Şili" },
        { iso_3166_1: "CN", english_name: "China", native_name: "Çin" },
        { iso_3166_1: "CZ", english_name: "Czech Republic", native_name: "Çek Cumhuriyeti" },
        { iso_3166_1: "DE", english_name: "Germany", native_name: "Almanya" },
        { iso_3166_1: "DK", english_name: "Denmark", native_name: "Danimarka" },
        { iso_3166_1: "ES", english_name: "Spain", native_name: "İspanya" },
        { iso_3166_1: "FI", english_name: "Finland", native_name: "Finlandiya" },
        { iso_3166_1: "FR", english_name: "France", native_name: "Fransa" },
        { iso_3166_1: "GB", english_name: "United Kingdom", native_name: "Birleşik Krallık" },
        { iso_3166_1: "US", english_name: "United States of America", native_name: "Amerika Birleşik Devletleri"},
        { iso_3166_1: "GE", english_name: "Georgia", native_name: "Gürcistan" },
        { iso_3166_1: "GR", english_name: "Greece", native_name: "Yunanistan" },
        { iso_3166_1: "HU", english_name: "Hungary", native_name: "Macaristan" },
        { iso_3166_1: "ID", english_name: "Indonesia", native_name: "Endonezya" },
        { iso_3166_1: "IN", english_name: "India", native_name: "Hindistan" },
        { iso_3166_1: "IR", english_name: "Iran", native_name: "İran" },
        { iso_3166_1: "IT", english_name: "Italy", native_name: "İtalya" },
        { iso_3166_1: "JP", english_name: "Japan", native_name: "Japonya" },
        { iso_3166_1: "KR", english_name: "South Korea", native_name: "Güney Kore" },
        { iso_3166_1: "KZ", english_name: "Kazakhstan", native_name: "Kazakistan" },
        { iso_3166_1: "MX", english_name: "Mexico", native_name: "Meksika" },
        { iso_3166_1: "NL", english_name: "Netherlands", native_name: "Hollanda" },
        { iso_3166_1: "PK", english_name: "Pakistan", native_name: "Pakistan" },
        { iso_3166_1: "PL", english_name: "Poland", native_name: "Polonya" },
        { iso_3166_1: "PT", english_name: "Portugal", native_name: "Portekiz" },
        { iso_3166_1: "QA", english_name: "Qatar", native_name: "Katar" },
        { iso_3166_1: "RS", english_name: "Serbia", native_name: "Sırbistan" },
        { iso_3166_1: "RU", english_name: "Russia", native_name: "Rusya" },
        { iso_3166_1: "SA", english_name: "Saudi Arabia", native_name: "Suudi Arabistan" },
        { iso_3166_1: "SE", english_name: "Sweden", native_name: "İsveç" },
        { iso_3166_1: "SG", english_name: "Singapore", native_name: "Singapur" },
        { iso_3166_1: "TM", english_name: "Turkmenistan", native_name: "Türkmenistan" },
        { iso_3166_1: "TR", english_name: "Turkey", native_name: "Türkiye" }
    ]

    getCountries() {
        return this.countries;
    }
}



