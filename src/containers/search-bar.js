import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getCountries, getMortality} from "../actions/index"

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state= {selectedCountry:this.props.defaultCountry}
  }

  // Lance action qui récupère la liste de tous les pays
  componentWillMount () {
    this.props.getCountries()
  }

  // Render de la searchbar + gestion de l'évènement avec fonction onChange
  renderSelectBox(){
    const {countries} = this.props
    if(countries){
      return (
        <select value={this.state.selectedCountry} onChange={(e) => this.search(e)} className="col-lg-12 input-group">
        {
          countries.map((country) => {
            return <option key={country} value={country}>{country}</option>
          })
        }
        </select>
      )
    } else {
      return <div>No country found</div>
    }
  }

// Récupère la valeur choisi dans la searchbar
// setState du pays choisi (selectedCountry)
// et relance l'action getMortality avec la selection en paramètre
// actualise tous les reducers et donc met à jour le state
search(e){
  this.setState({selectedCountry:e.target.value},() => {
    this.props.getMortality(this.state.selectedCountry)
  })
}

  render
    render () {
        return (
          <div className="search_bar">
            {this.renderSelectBox()}
          </div>
        )
    }
}

// voir containers mortality-list
const mapStateToProps = (state) => { 
  return {
    countries: state.countries
  }
}
// voir containers mortality-list
function mapDispatchToProps(dispatch){ 
  return bindActionCreators({getCountries, getMortality}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)