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

// Bonus Anwser Here
