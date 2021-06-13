const store = Store.init({name:"John",age:19,city:"NYC"})

const form = document.querySelector('form')
const namePlaceholder = document.querySelector(".name-placeholder")
const agePlaceholder = document.querySelector(".age-placeholder")
const cityPlaceholder = document.querySelector(".city-placeholder")

const formDataChanged = "formDataChanged"

store.on(formDataChanged,({name,age,city})=>{
  namePlaceholder.textContent = name
  agePlaceholder.textContent = age
  cityPlaceholder.textContent = city
})

const inputChangesHandler = (e)=>{
  const {value,name} = e.target
  store.emit(formDataChanged,{[name]:value})
}

[form.name,form.age,form.city].forEach(el=>
  el.addEventListener('keyup',inputChangesHandler)
)