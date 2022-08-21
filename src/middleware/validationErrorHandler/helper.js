function validationErrorToLogMessage(error) {
    const errorText = error.msg?.error ? error.msg.error : error.msg
    const errorValue = JSON.stringify(error.value)
    return `${errorText} ${error.param} ${errorValue}`
}

module.exports = {validationErrorToLogMessage}
