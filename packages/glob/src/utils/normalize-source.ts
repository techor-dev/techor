import upath from 'upath'

export default function normalizeSource(source: string | string[]): string | string[] {
    return Array.isArray(source)
        ? source.map(upath.normalize)
        : upath.normalize(source)
}