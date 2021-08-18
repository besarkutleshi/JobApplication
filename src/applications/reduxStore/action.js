export const ADD_QUESTIONS = 'ADD_QUESTIONS';

export const addQuestions = (questions) => {
    return (dispatch) => {
        dispatch({
            type: ADD_QUESTIONS,
            questions: questions
        });
    }
}
