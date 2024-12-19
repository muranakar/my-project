const initialQuestions = [
    {
        text: 'ご来店いただくきっかけとなった広告を教えてください',
        type: 'multiple',
        options: ['チラシ', 'DM', 'SNS', 'インターネット', '知人の紹介', '情報誌', '家／職場に近いから', '以前も通っていた', 'sample', 'sample', 'sample', 'sample', 'sample', 'sample', 'sample', 'sample', 'sample', 'sample',]
    },
    {
        text: '当店をどのように知りましたか？',
        type: 'single',
        options: ['インターネット検索', '友人・知人の紹介', 'SNS', '広告', 'その他']
    },
    {
        text: '当店のサービスについてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '当店の清潔さについてどのように評価しますか？',
        type: 'single',
        options: ['とても清潔', '清潔', '普通', '不潔', 'とても不潔']
    },
    {
        text: 'スタッフの対応についてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '最後にご意見・ご感想をお聞かせください',
        type: 'max5',
        options: ['とても満足', '満足', '普通', '不満', 'とても不満']
    }
];

const membershipQuestions = [
    {
        text: '入会の理由を教えてください',
        type: 'max4',
        options: ['価格', 'サービス', '立地', '口コミ', 'その他']
    },
    {
        text: '当店の会員特典についてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '当店の価格についてどのように評価しますか？',
        type: 'single',
        options: ['とても高い', '高い', '普通', '安い', 'とても安い']
    },
    {
        text: '当店の品揃えについてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '当店の営業時間についてどのように評価しますか？',
        type: 'multiple',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    }
];

const withdrawalQuestions = [
    {
        text: '退会の理由を教えてください',
        type: 'max2',
        options: ['価格', 'サービス', '立地', '口コミ', 'その他']
    },
    {
        text: '当店の退会手続きについてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '当店のサービスについてどのように評価しますか？',
        type: 'single',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    },
    {
        text: '当店の清潔さについてどのように評価しますか？',
        type: 'single',
        options: ['とても清潔', '清潔', '普通', '不潔', 'とても不潔']
    },
    {
        text: 'スタッフの対応についてどのように評価しますか？',
        type: 'max3',
        options: ['とても良い', '良い', '普通', '悪い', 'とても悪い']
    }
];

export { initialQuestions, membershipQuestions, withdrawalQuestions };