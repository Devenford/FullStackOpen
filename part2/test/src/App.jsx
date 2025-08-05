var animals = [
  {name: 'Fluffykins', species: 'rabbit'},
  {name: 'Caro', species: 'dog'},
  {name: 'Hamilton', species: 'dog'},
  {name: 'Harold', species: 'fish'},
  {name: 'Ursula', species: 'cat'},
  {name: 'Jimmy', species:  'fish'}
]

var isDog = function(animal) {
  return animals.species === 'dogs'
}

var dogs = animals.filter(isDog)





/*
var dogs = []
for (var i=0; i<animals.length; i++) {
  if(animals[i].species === 'dog') {
    dogs.push(animals[i])
  }
}*/











const App = () => {

  return (
    <div>Hello</div>
  )
}

export default App