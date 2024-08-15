// MIGHT STILL NEED TO BE UPDATED
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
  question: { type: String, required: true },
  choices: [choiceSchema],
  correct_choice: { type: Number, required: true },
});

const quizzesSchema = new mongoose.Schema(
  {
    course_id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    published: { type: Boolean, default: false },
    due_date: { type: Date, required: true },
    available_date: { type: Date, required: true },
    until_date: { type: Date, required: true },
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
    shuffle_answers: { type: Boolean, default: true },
    time_limit: { type: Number, default: 20 },
    multiple_attempts: { type: Boolean, default: false },
    show_correct_answers: {
      type: String,
      enum: ["Immediately", "After Submission", "Never"],
      default: "After Submission",
    },
    access_code: { type: String, default: "" },
    one_question_at_a_time: { type: Boolean, default: true },
    webcam_required: { type: Boolean, default: false },
    lock_questions_after_answering: { type: Boolean, default: false },
    questions: [questionSchema]
  },
  { collection: "quizzes" }
);

export default quizzesSchema;
