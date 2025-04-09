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
        description: "1: A, B, C, or D?",
        sliders: [
            { option: 'a', value: "0" },
            { option: 'b', value: "0" },
            { option: 'c', value: "0" },
            { option: 'd', value: "0" }
        ]
    },
    {
        description: "2: E, F, G, or H?",
        sliders: [
            { option: 'e', value: "0" },
            { option: 'f', value: "0" },
            { option: 'g', value: "0" },
            { option: 'h', value: "0" }
        ]
    },
    {
        description: "3:",
        sliders: [
            {option: "", value: ""}
        ]
    },
    {
        description: "4:",
        sliders: [
            {option: "", value: ""}
        ]
    },
    {
        description: "5:",
        sliders: [
            {option: "", value: ""}
        ]
    },
    {
        description: "6:",
        sliders: [
            {option: "", value: ""}
        ]
    },
    {
        description: "7:",
        sliders: [
            {option: "", value: ""}
        ]
    },
    {
        description: "8:",
        sliders: [
            {option: "", value: ""}
        ]
    },
]