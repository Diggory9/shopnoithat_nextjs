class HttpError extends Error{
    status: number
    payload: any
    constructor({status, payload}: {status: number, payload: any})
    {
        super('Http Error')
        this.status  = status,
        this.payload     = payload
    }
}

const request = async ()