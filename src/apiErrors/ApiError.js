class ApiError extends Error {
    /**
     * @param {{code: string, httpCode: number, message: string}} error
     */
    constructor(error) {
        super()
        this.code = error.code
        this.httpCode = error.httpCode
        this.message = error.message
    }
}

module.exports = ApiError
