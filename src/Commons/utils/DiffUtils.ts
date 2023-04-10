class DiffUtils<T> {
    static areEqual<T>(obj1: T, obj2: T): boolean {
        for (const key in obj1) {
            if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                if (obj1[key] !== obj2[key]) {
                    return false
                }
            }
        }

        for (const key in obj2) {
            if (Object.prototype.hasOwnProperty.call(obj2, key) && !obj1.hasOwnProperty(key)) {
                return false
            }
        }

        return true
    }
}

export default DiffUtils
