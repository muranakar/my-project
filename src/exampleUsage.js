import LocalDatabase from './data/LocalDatabase';

async function exampleUsage() {
    await LocalDatabase.init();

    const questions = [
        { id: 1, text: 'What is your name?' },
        { id: 2, text: 'How old are you?' },
        { id: 3, text: 'What are your hobbies?' }
    ];

    const answers = [
        { id: 1, questionId: 1, answer: 'John Doe' },
        { id: 2, questionId: 2, answer: '25' },
        { id: 3, questionId: 3, answer: 'Reading' },
        { id: 4, questionId: 3, answer: 'Traveling' }
    ];

    const questionAnswers = [
        { id: 1, questionId: 1, answers: ['John Doe'] },
        { id: 2, questionId: 2, answers: ['25'] },
        { id: 3, questionId: 3, answers: ['Reading', 'Traveling'] }
    ];

    await LocalDatabase.saveQuestions(questions);
    await LocalDatabase.saveAnswers(answers);
    await LocalDatabase.saveQuestionAnswers(questionAnswers);

    const savedQuestions = await LocalDatabase.getQuestions();
    const savedAnswers = await LocalDatabase.getAnswers();
    const savedQuestionAnswers = await LocalDatabase.getQuestionAnswers();

    console.log('Saved Questions:', savedQuestions);
    console.log('Saved Answers:', savedAnswers);
    console.log('Saved Question Answers:', savedQuestionAnswers);
}

exampleUsage();