class LocalDatabase {
    constructor() {
        this.dbName = 'questionnaireDB';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains('questions')) {
                    this.db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
                }
                if (!this.db.objectStoreNames.contains('answers')) {
                    this.db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
                }
                if (!this.db.objectStoreNames.contains('questionAnswers')) {
                    this.db.createObjectStore('questionAnswers', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async saveQuestions(questions) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['questions'], 'readwrite');
            const store = transaction.objectStore('questions');
            store.clear();
            questions.forEach((question) => {
                store.add(JSON.parse(JSON.stringify(question)));
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async saveAnswers(answers) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['answers'], 'readwrite');
            const store = transaction.objectStore('answers');
            store.clear();
            answers.forEach((answer) => {
                store.add(JSON.parse(JSON.stringify(answer)));
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async saveQuestionAnswers(questionAnswers) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['questionAnswers'], 'readwrite');
            const store = transaction.objectStore('questionAnswers');
            store.clear();
            questionAnswers.forEach((qa) => {
                store.add(JSON.parse(JSON.stringify(qa)));
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async getQuestions() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['questions'], 'readonly');
            const store = transaction.objectStore('questions');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async getAnswers() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['answers'], 'readonly');
            const store = transaction.objectStore('answers');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async getQuestionAnswers() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['questionAnswers'], 'readonly');
            const store = transaction.objectStore('questionAnswers');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
}

export default new LocalDatabase();