/*****************************************************************************************
* Part 2
****************************************************************************************/
const employees = [
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
        /*...don't foget to account for other entries of the same form, but with different group names.....*/
    ];

// Part 2 Answer Here

const newName = ({nameOrder, first, last}) => {
  return nameOrder === 'reverse' ? 
    { name: last + ' ' + first } :
    { name: first + ' ' + last }
}

const employeeReducer = (acc, employee) => {
  if(!acc[employee.group]) {
    acc[employee.group] = []
  }
  const employeeName = newName(employee)
  acc[employee.group] = [...acc[employee.group], employeeName]
  return acc;
}

const newEmployeeObject = (employees) => {
  return employees.reduce(employeeReducer, {})
}

console.log(newEmployeeObject(employees))

/*****************************************************************************************
* Bonus
****************************************************************************************/
const canvasContainer = document.querySelector('.content');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const genButton = document.getElementById('generate');
let rabbitArray = [];
let currentGen = [];

const drawCanvas = () => {
  context.strokeRect(0, 0, canvasContainer.innerHeight, canvasContainer.innerWidth);
  rabbitArray.forEach( rabbit => {
    context.fillRect(rabbit.x, rabbit.y, rabbit.height, rabbit.width)
  });
}

const resizeCanvas = () => {
  canvas.height = canvasContainer.offsetHeight;
  canvas.width = canvasContainer.offsetWidth;
  drawCanvas();
}

const startGenealogy = () => {
  for(let i = 0; i < 3; i++) {
    let x = Math.floor(Math.random() * canvas.width - 10);
    let y = Math.floor(Math.random() * canvas.height - 10);
    let rabbit = {height: 20, width: 20, x, y};
    context.fillRect(rabbit.x, rabbit.y, rabbit.height, rabbit.width);
    rabbitArray.push(rabbit);
  };
}

const createCurrentGen = () => {
  currentGen = rabbitArray.reduce( (acc, rabbit) => {
    let randomLength = Math.floor(Math.random() * 5);
    let newRabbits = [];
    while(newRabbits.length < randomLength) {
      let x = Math.floor(Math.random() * rabbit.x) + 5;
      let y = Math.floor(Math.random() * rabbit.y) + 5;
      let nextGenRabbit = { 
        height: (rabbit.height * .66), 
        width: (rabbit.width * .66), 
        x, 
        y 
      };
      newRabbits.push(nextGenRabbit);
      context.fillRect(nextGenRabbit.x, 
        nextGenRabbit.y, 
        nextGenRabbit.height, 
        nextGenRabbit.width);
    }
    acc = [...acc, ...newRabbits];
    return acc;
  }, []);
  rabbitArray = [...rabbitArray, ...currentGen];
}

const initialize = () => {
  window.addEventListener('resize', resizeCanvas);
  genButton.addEventListener('click', createCurrentGen);
  resizeCanvas();
  startGenealogy();
}

initialize();


