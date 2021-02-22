import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.json({ message: "Hello World - NLW 04" });
});

app.post('/', (req: Request, res: Response) => {
    return res.json({ message: "Os dados foram salvos com sucesso!" });
});

app.listen(3333, () => console.log("Server ir running!"));

// #rumoaoproximonivel