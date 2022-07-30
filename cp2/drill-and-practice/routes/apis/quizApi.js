import * as questionService from "../../services/questionService.js";
import * as questionOptionService from "../../services/questionOptionService.js";

const giveRandomQuestion = async ({ response }) => {
    const questions = await questionService.getRandomQuestions();  
    if (questions.length < 1) {
        response.body = {}; 
    } else {
        let options = await questionOptionService.listOptions(questions[0].id);

        for (let i = 0; i < options.length; i++) {
            delete options[i].question_id;
            delete options[i].is_correct;
            Object.assign(options[i], {optionId: options[i].id})['id'];
            delete options[i].id;
            Object.assign(options[i], {optionText: options[i].option_text})['option_text'];
            delete options[i].option_text;
        }
        let data = {
            questionId: questions[0].id,
            questionText: questions[0].question_text,
            answerOptions: options,
        }
        response.body = data;
    }
};

const gradeAnswer = async ({ request, response}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    let option = await questionOptionService.getOptionById(document.optionId)
    response.body = {
        correct: option.is_correct,
    };
}

export { giveRandomQuestion, gradeAnswer };
