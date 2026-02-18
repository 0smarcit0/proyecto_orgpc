import { set } from "astro:schema";

const b = document.querySelector(".startb");
const memory = document.querySelector(".memory");
const cpu = document.querySelector(".cpu");
const AC = document.querySelector(".AC");
const IR = document.querySelector(".IR");
const PC = document.querySelector(".PC");
const MQ = document.querySelector(".MQ");
const alu = document.querySelector(".big-alu");
const MBR = document.querySelector(".MBR");
const MAR = document.querySelector(".MAR");
const data = document.querySelectorAll(".memory-input");
let instructions = [];
let dataValues = [];
let cont_pc = 0;

let ac_value = 0;
let mq_value = 0;


let process_data = () => {
    data.forEach((input, index) => {
        if (index < 4) {
            instructions.push(input.value);
        } else {
            dataValues.push(input.value);
        }
    });
    console.log("Instrucciones:", instructions);
    console.log("Datos:", dataValues);
}

let process_load = async (dat,opcode) => {
    return new Promise((resolve) => {
        PC.textContent = `PC: ${cont_pc}`;
        PC.classList.add("active");
        setTimeout(() => {
            PC.classList.remove("active");
            MAR.textContent = `MAR: ${cont_pc}`;
            MAR.classList.add("active");
        }, 1500);
        setTimeout(() => {
            MAR.classList.remove("active");
            memory.classList.add("memory-act");
            //MBR.textContent = `MBR: ${opcode} ${dat[1]}`;
            //MBR.classList.add("active");
        }, 3000);

        setTimeout(() => {
            memory.classList.remove("memory-act");
            MBR.textContent = `MBR: ${dat[0]} ${dat[1]}`;
            MBR.classList.add("active");
        }, 4500);
        setTimeout(() => {        
            MBR.classList.remove("active");
            IR.textContent = `IR: ${opcode}`;
            IR.classList.add("active");
            MAR.textContent = `MAR: ${dat[1]}`;
            MAR.classList.add("active");
        }, 6000);

        setTimeout(() => {
            IR.classList.remove("active");
            MAR.classList.remove("active");
            MBR.classList.add("active");
            MBR.textContent = `MBR: ${dataValues[parseInt(dat[1])-5]}`;
        }, 7500);
        setTimeout(() => {
            MBR.classList.remove("active");
            MBR.textContent = `MBR`;
            if (opcode == "0001") {
                AC.textContent = `AC: ${dataValues[parseInt(dat[1])-5]}`;
                AC.classList.add("active");
                ac_value = parseInt(dataValues[parseInt(dat[1])-5]);
            } else {
                MQ.textContent = `MQ: ${dataValues[parseInt(dat[1])-5]}`;
                MQ.classList.add("active");
                mq_value = parseInt(dataValues[parseInt(dat[1])-5]);
            }
        }, 9000);
        setTimeout(() => {
            AC.classList.remove("active");
            MQ.classList.remove("active");
            resolve("done")
        }, 10500);});
    
}
let process_add = async (dat, opcode) => {
    return new Promise((resolve) => {
        PC.textContent = `PC: ${cont_pc}`;
        PC.classList.add("active");
        setTimeout(() => {
            PC.classList.remove("active");
            MAR.textContent = `MAR: ${cont_pc}`;
            MAR.classList.add("active");
        }, 1500);
        setTimeout(() => {
            MAR.classList.remove("active");
            memory.classList.add("memory-act");
            //MBR.textContent = `MBR: ${opcode} ${dat[1]}`;
            //MBR.classList.add("active");
        }, 3000);

        setTimeout(() => {
            memory.classList.remove("memory-act");
            MBR.textContent = `MBR: ${dat[0]} ${dat[1]}`;
            MBR.classList.add("active");
        }, 4500);
        setTimeout(() => {        
            MBR.classList.remove("active");
            IR.textContent = `IR: ${opcode}`;
            IR.classList.add("active");
            MAR.textContent = `MAR: ${dat[1]}`;
            MAR.classList.add("active");
        }, 6000);
        setTimeout(() => {
            IR.classList.remove("active");
            MAR.classList.remove("active");
            MBR.classList.add("active");
            MBR.textContent = `MBR: ${dataValues[parseInt(dat[1])-5]}`;
        }, 7500);
        setTimeout(() => {
            MBR.classList.remove("active");
            MBR.textContent = `MBR`;
          
            AC.textContent = `AC: ${ac_value+parseInt(dataValues[parseInt(dat[1])-5])}`;
            AC.classList.add("active");
            ac_value+= parseInt(dataValues[parseInt(dat[1])-5]);
        }, 9000);
        setTimeout(() => {
            AC.classList.remove("active");
            MQ.classList.remove("active");
            resolve("done")
        }, 10500);
    });
    
}
let process_stor = async (dat, opcode) => {
    return new Promise((resolve) => {
        PC.textContent = `PC: ${cont_pc}`;
        PC.classList.add("active");
        setTimeout(() => {
            PC.classList.remove("active");
            MAR.textContent = `MAR: ${cont_pc}`;
            MAR.classList.add("active");
        }, 1500);
        setTimeout(() => {
            MAR.classList.remove("active");
            memory.classList.add("memory-act");
            //MBR.textContent = `MBR: ${opcode} ${dat[1]}`;
            //MBR.classList.add("active");
        }, 3000);

        setTimeout(() => {
            memory.classList.remove("memory-act");
            MBR.textContent = `MBR: ${dat[0]} ${dat[1]}`;
            MBR.classList.add("active");
        }, 4500);
        setTimeout(() => {        
            MBR.classList.remove("active");
            IR.textContent = `IR: ${opcode}`;
            IR.classList.add("active");
            MAR.textContent = `MAR: ${dat[1]}`;
            MAR.classList.add("active");
        }, 6000);

        setTimeout(() => {
            IR.classList.remove("active");
            MAR.classList.remove("active");
            memory.classList.add("memory-act");
            data[parseInt(dat[1])-1].value = ac_value;
            dataValues[parseInt(dat[1])-1] = ac_value;
        }, 7500);
        setTimeout(() => {             
            memory.classList.remove("memory-act");
            resolve("done")
        }, 9000);
    });
}
let process_mul = async (dat, opcode) => {
    return new Promise((resolve) => {
        PC.textContent = `PC: ${cont_pc}`;
        PC.classList.add("active");
        setTimeout(() => {
            PC.classList.remove("active");
            MAR.textContent = `MAR: ${cont_pc}`;
            MAR.classList.add("active");
        }, 1500);
        setTimeout(() => {
            MAR.classList.remove("active");
            memory.classList.add("memory-act");
            //MBR.textContent = `MBR: ${opcode} ${dat[1]}`;
            //MBR.classList.add("active");
        }, 3000);

        setTimeout(() => {
            memory.classList.remove("memory-act");
            MBR.textContent = `MBR: ${dat[0]} ${dat[1]}`;
            MBR.classList.add("active");
        }, 4500);
        setTimeout(() => {        
            MBR.classList.remove("active");
            IR.textContent = `IR: ${opcode}`;
            IR.classList.add("active");
            MAR.textContent = `MAR: ${dat[1]}`;
            MAR.classList.add("active");
        }, 6000);
        setTimeout(() => {
            IR.classList.remove("active");
            MAR.classList.remove("active");
            MBR.classList.add("active");
            MBR.textContent = `MBR: ${dataValues[parseInt(dat[1])-5]}`;
        }, 7500);
        setTimeout(() => {
            MBR.classList.remove("active");
            MBR.textContent = `MBR`;
            if(mq_value*parseInt(dataValues[parseInt(dat[1])-5])>15){
                let val = String(mq_value*parseInt(dataValues[parseInt(dat[1])-5]));
                AC.textContent = `AC: ${val[0]}`;
                MQ.textContent = `MQ: ${val.slice(1)}`;
                

            }else{
                MQ.textContent = `MQ: ${mq_value*parseInt(dataValues[parseInt(dat[1])-5])}`;
                MQ.classList.add("active");
                mq_value+= parseInt(dataValues[parseInt(dat[1])-5]);
            }
            
        }, 9000);

    });
}
let   process_instructions = async () => {
    
    let dat = instructions[0].split(" ");
    if (dat[0] === "ADD") {
        let a = await process_add(dat, "0010");
    } else if (dat[0] === "STOR") {
        let a = await process_stor(dat, "0011");
    } else if (dat[0] === "MUL") {
        let a = await process_mul(dat, "0100");
    } else if (dat[0] === "LOAD") {
        let a = await process_load(dat, "0001");
    }else if (dat[0] === "LOAM") {
        let a = await process_load(dat, "0000");
    }
    cont_pc++;

    dat = instructions[1].split(" ");
    if (dat[0] === "ADD") {
        let a = await process_add(dat, "0010");
    } else if (dat[0] === "STOR") {
        let a = await process_stor(dat, "0011");
    } else if (dat[0] === "MUL") {
        let a = await process_mul(dat, "0100");
    } else if (dat[0] === "LOAD") {
        let a = await process_load(dat, "0001");
    }else if (dat[0] === "LOAM") {
        let a = await process_load(dat, "0000");
    }
    cont_pc++;

    dat = instructions[2].split(" ");
    if (dat[0] === "ADD") {
        let a = await process_add(dat, "0010");
    } else if (dat[0] === "STOR") {
        let a = await process_stor(dat, "0011");
    } else if (dat[0] === "MUL") {
        let a = await process_mul(dat, "0100");
    } else if (dat[0] === "LOAD") {
        let a = await process_load(dat, "0001");
    }else if (dat[0] === "LOAM") {
        let a = await process_load(dat, "0000");
    }
    cont_pc++;

    dat = instructions[3].split(" ");
    if (dat[0] === "ADD") {
        let a = await process_add(dat, "0010");
    } else if (dat[0] === "STOR") {
        let a = await process_stor(dat, "0011");
    } else if (dat[0] === "MUL") {
        let a = await process_mul(dat, "0100");
    } else if (dat[0] === "LOAD") {
        let a = await process_load(dat, "0001");
    }else if (dat[0] === "LOAM") {
        let a = await process_load(dat, "0000");
    }
    cont_pc++;

    cont_pc = 0;
    console.log("Instrucciones procesadas");
    instructions.pop();
    instructions.pop();
    instructions.pop();
    instructions.pop();
    dataValues.pop();
    dataValues.pop();
    dataValues.pop();
    dataValues.pop();
    b.disabled = false;
}

b.addEventListener("click", () => {
    console.log("Comenzando simulación...");
    b.disabled = true;
    console.log(data)
    process_data();
    process_instructions();
    
     // Re-habilitar el botón después de 5 segundos
});



