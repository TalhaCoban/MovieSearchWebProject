
export interface Person {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: string,
    profile_path: string,
    known_for: any[]
}

export interface PeopleResponse {
    page: number,
    results: Person[],
    total_pages: number,
    total_results: number
}