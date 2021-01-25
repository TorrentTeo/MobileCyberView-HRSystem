const { success, error, validation } = require("../../helpers/responseApi");
const ClientContract = require("../../models/clientContract");
const Verification = require("../../models/Verification");
const config = require('config');

exports.getLeave = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    
    const { title, terms, parties, id  } = req.body;
    try {
        // let newClientContract = new ClientContract({
        //     title: title,
        //     terms: terms,
        //     parties: parties,
        //     userid: id
        // });
        // console.log(newClientContract);
        // await newClientContract.save();
        // Send the response to server
        res.status(201).json(success("Thank You For Your Feedback",null,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.postLeave = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
}

exports.putLeave = async (req,res,next)=>{
    
}

exports.getCalendar = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
}

exports.postCalendar = async (req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
}

exports.putCalendar = async (req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
}

exports.deleteCalendar = async (req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
}