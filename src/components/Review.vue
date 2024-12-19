<template>
    <div class="review-container">
        <h1>回答内容の確認</h1>
        <div v-for="(question, index) in questions" :key="index"
            :class="['question-review', { 'alt-background': index % 2 === 0 }]">
            <p class="question-text">{{ question.text }}</p>
            <p class="answer-text">回答: {{ answerText[index] }}</p>
        </div>
        <button @click="goBack">戻る</button>
        <button @click="submitAnswers">送信</button>
        <button @click="loglog">送信</button>
    </div>
</template>

<script>
import LocalDatabase from '@/data/LocalDatabase';

export default {
    name: 'Review',
    data() {
        return {
            questions: [],
            answers: [],
            answerText: [] // 追加
        }
    },
    async created() {
        await LocalDatabase.init();
        this.questions = await LocalDatabase.getQuestions();
        this.answers = await LocalDatabase.getAnswers();
        console.log('answers', this.answers);
        this.answerText = this.answers.map((answer, index) =>
            answer ? (Array.isArray(answer.answers) ? answer.answers.join(',') : answer.answers) : '未回答'
        );
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'Sample1' });
        },
        submitAnswers() {
            this.$router.push({ name: 'ThankYou' });
        },
        async loglog() {

            this.questions = await LocalDatabase.getQuestions();
            this.answers = await LocalDatabase.getAnswers();
            console.log('answersーーーーーーー', this.answers);
        }
    }
}
</script>

<style scoped>
.review-container {
    padding: 10px;
    font-size: 12px;
    /* 文字の大きさを小さく */
}

h1 {
    font-size: 16px;
    /* h1の文字の大きさを小さく */
}

.question-review {
    padding: 3px;
}

.question-review.alt-background {
    background-color: #f0f8ff;
}

.question-text {
    font-weight: bold;
    font-size: 12px;
    /* 文字の大きさを小さく */
}

.answer-text {
    margin-left: 5px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button+button {
    margin-left: 10px;
}
</style>