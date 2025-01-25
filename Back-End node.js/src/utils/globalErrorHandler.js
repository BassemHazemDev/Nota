const globalError = (error, req, res, next) => { 
    let code = error.statusCode || 500
    res.status(code).json({ message: `error from global`, error: error.message })
}

export default globalError