import mongoose from "mongoose";

// Using subschema inside of quizzesSchema
const choiceSchema = new mongoose.Schema({
    option: String
});

// Using sub-schema inside of quizzesSchema
const questionSchema = new mongoose.Schema({
    title: String,
    type: {
        //https://stackoverflow.com/questions/57676596/how-to-allow-only-certain-string-values-inside-a-mongodb-array-using-mongoose
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
        required: true,
    },
    points: Number,
    question: {type: String, required: true},
    choices: [choiceSchema],
    correct_choice: {type: Number}, // For Multiple Choice questions
    correct_answers: [String], // For Fill in the Blank questions
    // For True/False questions, correct_choice can be (0 for False, 1 for True)
});

const quizzesSchema = new mongoose.Schema(
    {
        course_id: {type: String},
        title: {type: String},
        description: String,
        published: {type: Boolean, default: false},
        due_date: {type: Date},
        available_date: {type: Date},
        until_date: {type: Date},
        quiz_type: {
            type: String,
            enum: [
                "Graded Quiz",
                "Practice Quiz",
                "Graded Survey",
                "Ungraded Survey",
            ],
            default: "Graded Quiz",
        },
        points: Number,
        assignment_group: {
            type: String,
            enum: ["Quizzes", "Exams", "Assignments", "Projects"],
            default: "Quizzes",
        },
        shuffle_answers: {type: Boolean, default: true},
        time_limit: {type: Number, default: 20}, // in minutes
        multiple_attempts: {type: Boolean, default: false},
        attempts_allowed: {type: Number, default: 1},
        total_points: {type: Number, default: 0},
        // how_many_attempts needs to be worked on for if multiple attempts == true
        show_correct_answers: {
            type: String,
            enum: ["Immediately", "After Submission", "Never"],
            default: "After Submission",
        },
        access_code: {type: String, default: ""},
        one_question_at_a_time: {type: Boolean, default: true},
        webcam_required: {type: Boolean, default: false},
        lock_questions_after_answering: {type: Boolean, default: false},
        questions: [questionSchema],
        // store student attempts and scores
        attempts: [{
            student_id: String,
            answers: [mongoose.Schema.Types.Mixed], // store different answer formats
            score: Number,
            submitted_at: Date
        }],
        // availability
        status: {
            type: String,
            enum: ['draft', 'published', 'closed'],
            default: 'draft'
        },
    },
    {collection: "quizzes"}
);

export default quizzesSchema;
