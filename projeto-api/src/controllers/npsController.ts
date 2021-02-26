import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUserRepository } from "../Repositories/SurveyUserRepository";

class NpsController{

    /**
     * 
     1 2 3 4 5 6 7 8 9 10
     Detratores => 0 - 6
     Passivos => 7 - 8
     Promotores => 9 - 10

     (promotores - detratores) / respondentes x 100 // cálculo de NPS
     */

    async execute(req: Request, res: Response){
        const { survey_id } = req.params;
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractors = surveysUsers.filter(survey => survey.value >= 0 && survey.value < 7).length;
        const promoters = surveysUsers.filter(survey => survey.value > 8 && survey.value <= 10).length;
        const passives = surveysUsers.filter(survey => survey.value > 6 && survey.value < 9).length;
        const totalAnswers = surveysUsers.length;

        const calculate = Number(( promoters - detractors) / totalAnswers * 100).toFixed(2); 

        return res.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps: calculate,
        })

    }

}

export { NpsController };