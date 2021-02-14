const { success, error, validation } = require("../../helpers/responseApi");
const ClientContract = require("../../models/clientContract");
const Verification = require("../../models/verification");
const config = require('config');

exports.clientContractPost = async (req, res, next) => {
    const { title, terms, parties, id  } = req.body;
    try {
        let newClientContract = new ClientContract({
            title: title,
            terms: terms,
            parties: parties,
            userid: id
        });
        console.log(newClientContract);
        await newClientContract.save();
        // Send the response to server
        res.status(201).json(success("Thank You For Your Feedback",null,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}
exports.getAllClientContracts = async (req, res, next) => {

    try {
        const clientContract = await ClientContract.find({});
        await ClientContract.find({}, function(err, values) {
            var contracts = {};   
            values.forEach(async (value) =>  {       
                contracts[value._id] = value;        
            });
            res.status(201).json(success("Code Retrived",{contracts},res.statusCode))           
        });   
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}
