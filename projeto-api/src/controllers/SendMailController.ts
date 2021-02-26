import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../Repositories/SurveyRepository";
import { SurveyUserRepository } from "../Repositories/SurveyUserRepository";
import { UserRepository } from "../Repositories/UserRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';

class SendMailController {

    async execute(req: Request, res: Response){
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if(!userAlreadyExists) return res.status(400).json({
            error: "User does not exists",
        });

        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id });

        if(!surveyAlreadyExists) return res.status(400).json({
            error: "Survey does not exists",
        });

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        
        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: {user_id: userAlreadyExists.id, value: null}, //select and || [{ user_id },{ value }] select Or
            relations: ["user", "survey"],
        });

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: "",
            link: process.env.URL_MAIL,
        }
        
        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveyUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });
        await surveyUserRepository.save(surveyUser);

        variables.id = surveyUser.id;

        await SendMailService.execute(
            email, 
            surveyAlreadyExists.title,
            variables,
            npsPath,
        )

        return res.json(surveyUser);

    }
}


export { SendMailController };