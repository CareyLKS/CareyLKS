const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {isValidObjectId, Types}=require("mongoose");

//dashboard data
exports.getDashboardData = async (req,res) => {
    try{
        const userID=req.user.id;
        const userObjId = new Types.ObjectId(String(userID));

        //fetch total income + expense
        const totalIn = await Income.aggregate([
            {$match: {userID: userObjId}},
            {$group: {_id:null, total:{$sum: "$amount"}}},
        ]);
        console.log("Total income: ",{totalIn, userId: isValidObjectId(userID)});

        const totalExp = await Expense.aggregate([
            {$match: {userID: userObjId}},
            {$group: {_id:null, total:{$sum: "$amount"}}},
        ]);
        console.log("Total income: ",{totalExp, userId: isValidObjectId(userID)});

        //get only from last 60 days
        const last60DaysTrans = await Income.find({
            userID: userObjId,
            date: {$gte: new Date(Date.now()-60*24*3600*1000)},
        }).sort({date:-1});

        //get total
        const tt60Days = last60DaysTrans.reduce((acc, trans)=>acc+trans.amount,0);

        //30 days Expense
        const last30DaysTrans = await Expense.find({
            userID: userObjId,
            date: {$gte: new Date(Date.now()-30*24*3600*1000)},
        }).sort({date:-1});

        //get total
        const tt30Days = last30DaysTrans.reduce((acc, trans)=>acc+trans.amount,0);

        //last 5 trans (both In + Exp)
        const recentIncome = await Income.find({userID: userObjId}).sort({date:-1}).limit(5);
        const recentExpense = await Expense.find({userID: userObjId}).sort({date:-1}).limit(5);
        const lastTrans =[
            ...recentIncome.map(
                (txn)=>({...txn.toObject(), type: "income"})
            ),
            ...recentExpense.map(
                (txn)=>({...txn.toObject(), type: "expense"})
            ),
        ].sort((a,b)=>b.date-a.date); //latest first

        res.json({
            totalBalance: (totalIn[0]?.total || 0) - (totalExp[0]?.total || 0),
            totalIncome: (totalIn[0]?.total || 0),
            totalExpense: (totalExp[0]?.total || 0),
            last30Days:{total: tt30Days, transactions: last30DaysTrans},
            last60Days:{total: tt60Days, transactions: last60DaysTrans},
            recentTrans: lastTrans,
        })

    } catch (err){
        res.status(500).json({message:"Get data error", error: err.message});
    }
}