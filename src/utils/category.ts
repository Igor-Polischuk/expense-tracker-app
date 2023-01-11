export default function getCategory() {

    const expenseCategories = [
        {
            title: 'utility bills',
            categories: [
                'rent an apartament',
                'utility bills for water',
                'utility bills for gas',
                'utility bills for electricity',
                'other utility payments',
            ]
        },
        {
            title: 'car',
            categories: [
                'leasing',
                'attention',
                'gasoline',
                'parking',
                'insurance',
            ]
        },
        {
            title: 'foods and drinks',
            categories: [
                'Groceries',
                'bars, cafes',
                'restaurants, fast food',
            ]
        },
        {
            title: 'transport',
            categories: [
                'taxi',
                'public transport',
                'long distances',
            ]
        },
        {
            title: 'shoping',
            categories: [
                'pets',
                'children',
                'household items',
                'home electronics',
                'gadgets',
                'clothes and shoes',
                'jeweler',
            ]
        },
        {
            title: 'comunication',
            categories: [
                'internet',
                'Mobile Communication',
                'subscription',
                'landline and mobile phone',
                'soft',
                'TV'
            ]
        },
        {
            title: 'health and beauty',
            categories: [
                'gym',
                'makeup',
                'care products',
                'nutritional supplements',
                'medicine',
                'doctor\'s appointment'
            ]
        },
        {
            title: 'life',
            categories: [
                'tobacco',
                'alcohol',
                'intimate',
                'hobby',
                'video games',
                'books',
                'musuc',
                'concert',
                'travel',
                'festival',
                'toys',
                'lotteries and gambling',
                'entertainment'
            ]
        },
        {
            title: 'financial expenses',
            categories: [
                'alimony',
                'pay',
                'consultations',
                'taxes',
                'insurance',
                'fines',
                'return debt'
            ]
        },
        {
            title: 'other',
            categories: []
        },
    ]

    const incomeCategories = [
        {
            title: 'income',
            categories: [
                'salary',
                'debt',
                'chalk',
                'investement',
                'other'
            ]
        },

    ]

    return {
        income: incomeCategories,
        expense: expenseCategories
    }
}