
export function generatedId() : string {
    return `${Date.now()%100000}`
}