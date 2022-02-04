const fs = require("fs");
const data = fs.readFileSync("algoc.in.txt", "utf8");
const constantsArray = data.split("\n").map((constant) => +constant.replace("\r", ""));

const plusOrMinus = (constant) => {
    return constant > 0 ? {constant: 1, instruction: "PLUSONE"} : {constant: -1, instruction: "MINUSONE"}
}

const inc = (constant) => {
    return {constant: constant + 1, instruction: "INC"}
}

const dup = (constant) => {
    return {constant: constant * 2, instruction: "DUP"}
}

const verifyConstant = () => {
    const constantsVerifieds = [];
    for(let i = 0; i < constantsArray.length; i++){
        if(constantsArray[i] === 0){
            break
        }
        
        if(constantsArray[i] > 32767 || constantsArray[i] < -32768){
            console.lop(`Constante ${constantsArray[i]} fora do escopo.`)
        }else {
            const constantCreated = {
                constant: constantsArray[i],
                actualConstant: 0,
                instructions: []
            }
    
            const response = plusOrMinus(constantCreated.constant);
            constantCreated.actualConstant = response.constant;
            constantCreated.instructions.push(response.instruction);
    
            while(true){
                if(constantCreated.actualConstant === constantCreated.constant){
                    break;
                }

                let response;

                if(constantCreated.actualConstant < 0){
                    if(constantCreated.actualConstant - 1 === constantCreated.constant){
                        response = inc(constantCreated.actualConstant)
                    }else{
                        (constantCreated.actualConstant + 1 > constantCreated.constant)?
                            response = dup(constantCreated.actualConstant)
                        :
                        response = inc(constantCreated.actualConstant)
                    }
                }else{
                    ((constantCreated.actualConstant === 1 || constantCreated.actualConstant % 2 !== 0) && constantCreated.actualConstant * 2 <= constantCreated.constant)?
                        response = dup(constantCreated.actualConstant)
                    :
                        response = inc(constantCreated.actualConstant)
                }
                constantCreated.actualConstant = response.constant;
                constantCreated.instructions.push(response.instruction)
            }

            constantsVerifieds.push(constantCreated)
        }

    }

    console.log(constantsVerifieds)
}

verifyConstant();