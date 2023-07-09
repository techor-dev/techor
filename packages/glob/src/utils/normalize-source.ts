import { normalize } from 'upath'

export default function normalizeSource(source: string | string[]): string | string[] {
    return Array.isArray(source)
        ? source.map(normalize)
        : normalize(source)
}