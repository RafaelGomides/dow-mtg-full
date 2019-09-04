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
    if (JSON.stringify(prevState.cardSelected) !== JSON.stringify(nextProps.card.selected)) {
      nextState = {
        cardSelected: { ...nextProps.card.selected },
      }
    }
    if (JSON.stringify(prevState.cardList) !== JSON.stringify(nextProps.card.list)) {
      nextState = {
        ...nextState,
        cardList: [ ...nextProps.card.list ],
      }
    }
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

  handleChangeMana(key = '', value = null) {
    this.setState({
      cardSelected: {
        ...this.state.cardSelected,
        mana_cost: {
          [key]: value,
        }
      }
    });
  }

  renderForm() {
    return (
      <>
        <form>
          <label>Nome</label>
          <input value={this.state.cardSelected.name} placeholder='Nome' onChange={(v) => this.handleChange('name', v.target.value)}/>
          <p />
          <label>Custo de mana</label>
          <input value={this.state.cardSelected.mana_cost.red} placeholder='Vermelha' onChange={(v) => this.handleChangeMana('red', v.target.value)}/>
          <input value={this.state.cardSelected.mana_cost.green} placeholder='Verde' onChange={(v) => this.handleChangeMana('green', v.target.value)}/>
          <input value={this.state.cardSelected.mana_cost.white} placeholder='Branca' onChange={(v) => this.handleChangeMana('white', v.target.value)}/>
          <input value={this.state.cardSelected.mana_cost.black} placeholder='Preta' onChange={(v) => this.handleChangeMana('black', v.target.value)}/>
          <input value={this.state.cardSelected.mana_cost.blue} placeholder='Azul' onChange={(v) => this.handleChangeMana('blue', v.target.value)}/>
          <input value={this.state.cardSelected.mana_cost.any} placeholder='Qualquer' onChange={(v) => this.handleChangeMana('any', v.target.value)}/>
          <p />
          <label>Descrição</label>
          <input value={this.state.cardSelected.description} placeholder='Descrição' onChange={(v) => this.handleChange('description', v.target.value)}/>
          <p />
          <label>Atk / Def</label>
          <input value={this.state.cardSelected.atkdef} placeholder='Atk / Def' onChange={(v) => this.handleChange('atkdef', v.target.value)}/>
          <p />
          <label>Habilidades</label>
          <input value={this.state.cardSelected.spells} placeholder='Habilidade' onChange={(v) => this.handleChange('spells', v.target.value)}/>
          <p />
          <label>Tipo</label>
          <input value={this.state.cardSelected.type} placeholder='Tipo' onChange={(v) => this.handleChange('type', v.target.value)}/>
        </form>
      </>
    );
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