import '../css/app.scss'
import 'bootstrap'

const divPremios = document.querySelector('.premios')
const badicionar = document.querySelector('.adicionar')
const bremover = document.querySelector('.remover')

const status = {
  qtdAdicionada: 0,
}

badicionar.addEventListener('click', () => {
  divPremios.innerHTML += `<div class="row my-2">
    <div class="col-3"><span>${status.qtdAdicionada + 2}º lugar</span></div>
        <div class="col-9">
            <input type="text" class="form-control" id="prize${
              status.qtdAdicionada + 2
            }" name="prize${status.qtdAdicionada + 2}">
        </div>
    </div>`
  status.qtdAdicionada++
})

bremover.addEventListener('click', () => {
  if (status.qtdAdicionada > 0) {
    console.log(divPremios.lastElementChild.remove())
    status.qtdAdicionada--
  }
})
