// Les containers récupèrent le state du store
// Puis render les components
// Le state de l'app va devenir les props des components
// Dès que le state change les components sont actualisés

import React, {Component} from 'react'
import MortalityListItem from '../components/mortality-list-item'
import {getMortality} from '../actions/index'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class MortalityList extends Component {

  // Lance l'action getMortality avec param par defaut (france => props app.js)
  // Puis render les stats de mortalité à partir de la props
  // La props venant de mapStateToProps qui récupère le state.mortality
  // et la transforme en props mortalities
  componentWillMount () {
    this.props.getMortality(this.props.defaultCountry)
  }
  renderMortalities(){
    const {mortalities} = this.props
    return mortalities.map((data) => {
      return <MortalityListItem key={data.country} mortality={data} />
    })
  }

  // Render un simple tableau faisant appel à la fonction renderMortalities
  // elle mm faisant appel au component MortalityListItem
  render () {
    return (
      <div>
        <table className="table">
          <thead>
            <th>Pays</th>
            <th className="col-md-6">Hommes</th>
            <th className="col-md-6">Femmes</th>
          </thead>
          <tbody>
            {this.renderMortalities()}
          </tbody>
        </table>
      </div>
    )
  }
}

// mapStateToProps recupere une partie de le state du store 
// et la renvoie en props pour le component
// Ici on récupère le state.mortality du store 
// et on la transforme en props mortalities
const mapStateToProps = (state) => { 
  return {
    mortalities: state.mortality
  }
}

// mapDispatchToProps permet de lancer une action (bindActionCreators)
// qui va relancer TOUS les reducers, donc mettre à jour le state
// puis eventuellement le component (la boucle est bouclé)
// Ici met getMortality dans les props donc maintenant quand on l'appelle,
// elle ne retourne pas seulement son action mais
// l'envoie et dispatch à tous ses reducers pour l'avoir dans la state
function mapDispatchToProps(dispatch){
  return bindActionCreators({getMortality}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MortalityList)