import {Schema,model} from "mongoose";

const MedicineSchema = new Schema({

    name:{

        type:String,
        require:true
    },

    description:{
        type:String,
        require:true,
        
    },

    price:{

        type:Number,
        require:false
    },

    stock:{

        type:Number,
        require:true,
        default:0
    },

    type:{

        type:String,
        require:true
    },
    entryDate:{

        type:Date,
        require:true,
        default: Date.now()
    },
    expirationDate:{

        type:Date,
        require:true
    },
    status:{

        type:Boolean,
        require:true,
        default:true
    },
},{ timestamps: true }
)

export default model("Medicine",MedicineSchema);



