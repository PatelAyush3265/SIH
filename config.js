const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://patel532006:8PLKi0gY3kgq0Ea0@sih.edtga.mongodb.net/");

connect.then(() => {
        console.log("Database connected .....");
    })
    .catch(() => {
        console.log("database not connected.....");
    });

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }

});

const collection = new mongoose.model("data12", LoginSchema);
module.export = collection;