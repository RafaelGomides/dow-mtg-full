import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cards as ModelCard, DeleteCard, 
  GetAllCards, SaveCard, SelectCard, 
  UpdateCard } from '../../../models/Cards/cards.action';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSelected: new ModelCard({}),
      cardList: [],
      cardIsShowing: '',
    }
  }

  componentDidMount() {
    this.props.GetAllCards();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = { ...prevState };
    return nextState;
  }

  /** Handle Change
   * Handle de alterações do estado do componente
   */
  handleChange(key = '', value = null) {
    this.setState({
      cardSelected: {
        ...this.state.cardSelected,
        [key]: value,
      },
    });
  }

  renderForm() {
    return 'Isso é um formulario'
  }

  renderList() {
    return (
      <>
        <h2>Lista de Cartinhas Coloridas</h2>
        <table>
          <thead>
            <th>#</th>
            <th>Nome</th>
            <th>Custo de Mana</th>
            <th>Descrição</th>
            <th>Atk / Def</th>
            <th>Habilidades</th>
            <th>Tipo</th>
          </thead>
          <tbody>
            { this.state.cardList.map(card => (
              <tr>
                <td>{ card._id }</td>
                <td>{ card.name }</td>
                <td>{ card.mana_cost }</td>
                <td>{ card.description }</td>
                <td>{ card.atkdef }</td>
                <td>{ card.spells }</td>
                <td>{ card.type }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </>
    );
  }

  renderSwitch() {
    switch (this.state.cardIsShowing) {
      case 'form':
        return this.renderForm();
      case 'list':
        return this.renderList();
      default:
        return '';
    }
  }

  render() {
    return (
      <>
        <h1>Cards</h1>
        { this.renderSwitch() }
        <br/>
        <button onClick={() => this.setState({cardIsShowing: 'list'})}>Mostrar Lista de Cards</button>
        <button onClick={() => this.setState({cardIsShowing: 'form'})}>Adicionar novo Card</button>
      </>
    );
  }

}

const mapStateToProps = store => ({
  card: store.cardsState,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    DeleteCard, 
    GetAllCards, 
    SaveCard, 
    SelectCard, 
    UpdateCard,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);