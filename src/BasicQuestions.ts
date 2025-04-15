export interface Slider {
    option: string,
    value: string
}

export interface BasicQuestionType {
    description: string,
    sliders: Slider[]
};

export const BasicQuestionSet: BasicQuestionType[] = [
    {
        description: "1: How interested are you in the following?",
        sliders: [
            { option: 'Solving Problems/Puzzles', value: "0" },
            { option: 'Designing or Building', value: "0" },
            { option: 'Performing or Creating Art', value: "0" },
            { option: 'Learning and Researching', value: "0" }
        ]
    },
    {
        description: "2: How skilled are you in the following?",
        sliders: [
            { option: 'Public Speaking/Presenting', value: "0" },
            { option: 'Digital Tools/Technology', value: "0" },
            { option: "Understanding Feelings of Others", value: "0" },
            { option: 'Writing and Communication', value: "0" }
        ]
    },
    {
        description: "3: How interested are you in the following?",
        sliders: [
            { option: 'Working with Data/Numbers', value: "0" },
            { option: 'Being Physically Active', value: "0" },
            { option: 'Working with Nature', value: "0" },
            { option: 'Learning About Societies', value: "0" }
        ]
    },
    {
        description: "4: How skilled are you in the following?",
        sliders: [
            { option: 'Collaborating with Others', value: "0" },
            { option: 'Organizing and Managing', value: "0" },
            { option: 'Focusing on Repeated Tasks', value: "0" },
            { option: 'Creative Thinking', value: "0" }
        ]
    },
    {
        description: "5: How much do you value the following?",
        sliders: [
            { option: 'Working with People', value: "0" },
            { option: 'Flexible Schedule', value: "0" },
            { option: 'Comfortable Environment', value: "0" },
            { option: 'Self-Expression', value: "0" }
        ]
    },
    {
        description: "6: How much are the following suited to you?",
        sliders: [
            { option: 'Hands-On Learning', value: "0" },
            { option: 'Visual Learning', value: "0" },
            { option: 'Improvising', value: "0" },
            { option: 'Handling Stress', value: "0" }
        ]
    },
    {
        description: "7: How much do you value the following?",
        sliders: [
            { option: 'Autonomous Choices', value: "0" },
            { option: 'Serving the Greater Good', value: "0" },
            { option: 'Being a Leader', value: "0" },
            { option: 'Routine and Structure', value: "0" }
        ]
    },
    {
        description: "8: How much are the following suited to you?",
        sliders: [
            { option: 'Trying New Things', value: "0" },
            { option: 'Following a Plan', value: "0" },
            { option: 'Empathizing with Others', value: "0" },
            { option: 'Competitive Environment', value: "0" }
        ]
    },
]