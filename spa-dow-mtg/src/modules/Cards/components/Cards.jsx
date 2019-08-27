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
    return 'Isso é uma lista'
  }

  render() {
    return (
      <>
        <div>Cards</div>
        { this.renderForm() }
        { this.renderList() }
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