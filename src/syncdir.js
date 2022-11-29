import fs from 'fs';
export function isDirSync(aPath) {
    try {
        return fs.statSync(aPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENONET') {
            return false;
        } else {
            throw e
        }
    }
}