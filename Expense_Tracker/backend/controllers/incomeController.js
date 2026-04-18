const xlsx= require("xlsx");
const Income= require("../models/Income");

//Add income
exports.addIncome = async(req,res)=>{
    const userID = req.user.id;
    try {
        const {icon, source, amount, date}=req.body;
        if (!source || !amount || !date) return res.status(400).json({message:"All fields are required"});

        const newIncome = new Income({
            userID, icon, source, amount, date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    }catch(err){
        res.status(500).json({message: "Serror Error Add new User",error:err.message});
    }
}

//Get All income
exports.getAlIC = async(req,res)=>{
    const userID = req.user.id;
    try{
        const income = await Income.find({userID}).sort({date: -1});
        res.json(income);
    } catch (err){
        res.status(500).json({message:" Server Retrieve Data error"});
    }
}

//Del income
exports.delIC = async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted"});
    } catch (err){
        res.status(500).json({message:" Server Delete Data error"});
    }
}

//Download Excel
exports.downICEx = async(req,res)=>{
    const userID = req.user.id;
    try{
        const income = await Income.find({userID}).sort({date: -1});
        const data=income.map((item)=>({
            Source: item.source, Amount: item.amount, Date: item.date
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        // xlsx.utils.writeFile(wb, `income_details_${new Date(date)}.xlsx`);
        // res.download(`income_details_${new Date(date)}.xlsx`);
        xlsx.writeFile(wb, `income_details.xlsx`);
        res.download(`income_details.xlsx`);
    } catch (err){
        res.status(500).json({message:"Download Excel error", error: err.message});
    }
    
}