import { writeToFile } from '../src'
import fs from 'fs'
import path from 'path'

it('write to a non-existent file', () => {
    const filePath = path.resolve(__dirname, 'write-a.json')
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath)
    }
    writeToFile(filePath, { 'name': 'a' })
    expect(fs.existsSync(filePath)).toBeTruthy()
})

it('non-existent deep file', () => {
    const filePath = path.resolve(__dirname, 'dir1/dir2/write-a.json')
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath)
    }
    writeToFile(filePath, { 'name': 'a' })
    expect(fs.existsSync(filePath)).toBeTruthy()
})