import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.get("/api/assignments/:asid", (req, res) => {
        const {asid} = req.params;
        const assignments = db.assignments.filter((a) => a._id === asid);
        res.send(assignments);
    });
    app.delete("/api/assignments/:asid", (req, res) => {
        const {asid} = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== asid);
        res.sendStatus(200);
    });
    app.put("/api/assignments/:asid", (req, res) => {
        const {asid} = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === asid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
}