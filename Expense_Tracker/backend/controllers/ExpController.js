const xlsx= require("xlsx");
const Expense= require("../models/Expense");
const { Error } = require("mongoose");

//Add Expense (baiscally same as Add Income)
exports.addExpense = async(req,res)=>{
    const userID = req.user.id;
    try {
        const {icon, cat, amount, date}=req.body;
        if (!cat || !amount || !date) return res.status(400).json({message:`All fields are required ${cat} ${amount} ${date}`});

        const newExpense = new Expense({
            userID, icon, cat, amount, date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);

    }catch(err){
        res.status(500).json({message: "Server Error Add new User",error:err.message});
    }
}

//Get All Expense
exports.getAlEx = async(req,res)=>{
    const userID = req.user.id;
    try{
        const expenses = await Expense.find({userID}).sort({date: -1});
        res.json(expenses);
    } catch (err){
        res.status(500).json({message:" Server Retrieve Data error", Error: err.message});
    }
}

//Del Expense
exports.delEx = async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted"});
    } catch (err){
        res.status(500).json({message:" Server Delete Data error"});
    }
}

//Download Excel
exports.downEx = async(req,res)=>{
    const userID = req.user.id;
    try{
        const expenses = await Expense.find({userID}).sort({date: -1});
        const data=expenses.map((item)=>(
            {cat: item.cat, Amount: item.amount, Date: item.date}
        ));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        // xlsx.utils.writeFile(wb, `Expense_details_${new Date(date)}.xlsx`);
        // res.download(`Expense_details_${new Date(date)}.xlsx`);
        xlsx.writeFile(wb, `Expense_details.xlsx`);
        res.download(`Expense_details.xlsx`);
    } catch (err){
        res.status(500).json({message:"Download Excel error", error: err.message});
    }
    
}