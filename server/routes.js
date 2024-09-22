import express from 'express'
import FinancialRecordModel from './schema.js';
import AuthModel from './authSchema.js';

const router = express.Router()

router.post("/signup", async (req, res) => {
    try {
        const newUser = req.body

        // check if user exists
        const search_result = await AuthModel.find({ username: newUser.username })
        if (search_result.length !== 0) {
            return res.status(403).send("User with same username already exists!")
        }

        const newRecord = new AuthModel(newUser)
        const savedRecord = await newRecord.save()
        res.status(200).send(savedRecord)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        // check if user exists
        const validation = await AuthModel.find({ username: username })
        if (validation.length === 0) {
            return res.status(404).send("User not found!")
        }

        // check if password is correct
        if (validation[0].password === password) {
            res.status(200).send({ username: validation[0].username, userId: validation[0]._id })
        } else {
            res.status(401).send("Invalid password!")
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/getExpenses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const records = await FinancialRecordModel.find({ userId: userId });
        if (records.length === 0) {
            return res.send("")
        }
        res.status(200).send(records)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/addExpense", async (req, res) => {
    try {
        const newRecordBody = req.body
        const newRecord = new FinancialRecordModel(newRecordBody)
        const savedRecord = await newRecord.save()
        res.status(200).send(savedRecord)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put("/updateExpense/:id", async (req, res) => {
    try {
        const id = req.params.id
        const newRecordBody = req.body
        const record = await FinancialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true })
        if (!record) {
            return res.status(404).send()
        }
        res.status(200).send(record)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/deleteExpense/:id", async (req, res) => {
    try {
        const id = req.params.id
        const record = await FinancialRecordModel.findByIdAndDelete(id)
        if (!record) {
            return res.status(404).send()
        }
        res.status(200).send(record)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router