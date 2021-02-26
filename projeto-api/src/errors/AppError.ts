export class AppError {

    constructor(
        public readonly message:string,
        public readonly statusCode = 400
    ) {}

   /* constructor(message: string, statusCode: number){
        this.message = message;
        this.statusCode = statusCode;
    }*/
}