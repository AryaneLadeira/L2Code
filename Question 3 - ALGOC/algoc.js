const fs = require("fs");
const data = fs.readFileSync("algoc.in.txt", "utf8");
const constantsArray = data.split("\n").map((constant) => +constant.replace("\r", ""));

const plusOrMinus = (constant) => {
    return constant > 0 ? {constant: 1, instruction: "PLUSONE"} : {constant: -1, instruction: "MINUSONE"}
}

const verifyConstant = () => {
    for(let i = 0; i < constantsArray.length; i++){
        if(constantsArray[i] === 0){
            break
        }

        const constantCreated = {
            constant: constantsArray[i],
            actualConstant: 0,
            instructions: []
        }

        const response = plusOrMinus(constantCreated.constant);
        constantCreated.actualConstant = response.constant;
        constantCreated.instructions.push(response.instruction);

        console.log(constantCreated)
    }
}

verifyConstant();