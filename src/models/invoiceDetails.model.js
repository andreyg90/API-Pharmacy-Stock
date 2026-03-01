import { Schema,model } from "mongoose";

const invoiceDetailSchema =new Schema({

    invoice:{

        type:Schema.Types.ObjectId,
        ref:'Invoice',
        require:true
    },

    medicine:{
        type:Schema.Types.ObjectId,
        ref:'Medicine',
        require:true
        
    },

    quantity:{

        type:Number,
        require:true,
        
    },
    unitPrice:{

        type: Number,
        require:true, 
    },

    amount:{
        type:Number,
        require:true
    }
},{ timestamps: true })

export default model("InvoiceDetail",invoiceDetailSchema)
