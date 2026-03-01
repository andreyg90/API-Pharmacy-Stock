import { Schema,model } from "mongoose";

const invoiceSchema =new Schema({

    clientName:{

        type:String,
        require:true
    },

    dateInvoice:{
        type:Date,
        default:Date.now(),
        
    },

    total:{

        type:Number,
        require:false,
        default:0
    }
},{ timestamps: true })

export default model("Invoice",invoiceSchema)




