export class SystemException extends Error{
    constructor(err?: string){
        super()
        if(err){
            this.message = err
        }
    }
}