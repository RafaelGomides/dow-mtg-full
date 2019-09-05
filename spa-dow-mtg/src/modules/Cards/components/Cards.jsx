import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cards as ModelCard, GetAllCards, SaveCard,
} from '../../../models/Cards/cards.action';
import { Row, Col, Form, FormGroup, Label, Input, Button,
  CardTitle, CardText, CardHeader, CardFooter, Card, CardBody,
  Toast, ToastHeader} from 'reactstrap';

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
    if (prevState.cardIsShowing !== 'form') {
      if (JSON.stringify(prevState.cardSelected) !== JSON.stringify(nextProps.card.selected)) {
        nextState = {
          cardSelected: { ...nextProps.card.selected },
        }
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
          ...this.state.cardSelected.mana_cost,
          [key]: value,
        }
      }
    });
  }

  handleSendDataForm() {
    this.props.SaveCard(this.state.cardSelected);
    this.setState({
      cardSelected: new ModelCard({}),
    })
  }

  renderForm() {
    return (
      <>
      <h2>Novo Card</h2>
        <Form>
          <FormGroup>
            <Label>Nome</Label>
            <Input value={this.state.cardSelected.name} placeholder='Nome' onChange={(v) => this.handleChange('name', v.target.value)}/>
          </FormGroup>
          <h3>Custo de mana</h3>
          <Row>
            <Col>
              <FormGroup>
                <Label>Vermelha</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.red} placeholder='Vermelha' onChange={(v) => this.handleChangeMana('red', v.target.value)}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Verde</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.green} placeholder='Verde' onChange={(v) => this.handleChangeMana('green', v.target.value)}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Branca</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.white} placeholder='Branca' onChange={(v) => this.handleChangeMana('white', v.target.value)}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Preta</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.black} placeholder='Preta' onChange={(v) => this.handleChangeMana('black', v.target.value)}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Azul</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.blue} placeholder='Azul' onChange={(v) => this.handleChangeMana('blue', v.target.value)}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Qualquer</Label>
                <Input type='number' value={this.state.cardSelected.mana_cost.any} placeholder='Qualquer' onChange={(v) => this.handleChangeMana('any', v.target.value)}/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Descrição</Label>
            <Input value={this.state.cardSelected.description} placeholder='Descrição' onChange={(v) => this.handleChange('description', v.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Atk / Def</Label>
            <Input value={this.state.cardSelected.atkdef} placeholder='Atk / Def' onChange={(v) => this.handleChange('atkdef', v.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Habilidades</Label>
            <Input value={this.state.cardSelected.spells} placeholder='Habilidade' onChange={(v) => this.handleChange('spells', v.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label>Tipo</Label>
            <Input value={this.state.cardSelected.type} placeholder='Tipo' onChange={(v) => this.handleChange('type', v.target.value)}/>
          </FormGroup>
          <Button onClick={() => this.handleSendDataForm()}>Salvar informações</Button>
        </Form>
      </>
    );
  }

  renderList() {
    console.log(this.state.cardList);
    
    return (
      <>
        <h2>Lista de Cartinhas Coloridas</h2>
        { this.state.cardList.map((card, index) => (
          <Card key={`card${index}`}>
            <CardHeader><strong>{ card._id }</strong></CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Toast>
                    <ToastHeader icon="danger">
                    { card.mana_cost.red } Vermelha
                    </ToastHeader>
                  </Toast>
                </Col>
                <Col>
                  <Toast>
                    <ToastHeader icon="success">
                    { card.mana_cost.green } Verde
                    </ToastHeader>
                  </Toast>
                </Col>
                <Col>
                  <Toast>
                    <ToastHeader icon="light">
                    { card.mana_cost.white } Branca
                    </ToastHeader>
                  </Toast>
                </Col>
                <Col>
                  <Toast>
                    <ToastHeader icon="dark">
                    { card.mana_cost.black } Preta
                    </ToastHeader>
                  </Toast>
                </Col>
                <Col>
                  <Toast>
                    <ToastHeader icon="primary">
                    { card.mana_cost.blue } Azul
                    </ToastHeader>
                  </Toast>
                </Col>
                <Col>
                  <Toast>
                    <ToastHeader icon="secondary">
                    { card.mana_cost.any } Qualquer
                    </ToastHeader>
                  </Toast>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <CardTitle>
                    <h3>
                      { card.name }
                    </h3>
                  </CardTitle>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardText><i>{ card.type }</i></CardText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardText>{ card.spells }</CardText>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardText><i>"{ card.description }"</i></CardText>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>Ataque / Defesa: { card.atkdef }</CardFooter>
          </Card>
        )) }
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
        <hr />
        <Row>
          <Button onClick={() => this.setState({cardIsShowing: 'list'})}>Mostrar Lista de Cards</Button>
          <Button onClick={() => this.setState({cardIsShowing: 'form'})}>Adicionar novo Card</Button>
        </Row>
      </>
    );
  }

}

const mapStateToProps = store => ({
  card: store.cardsState,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    GetAllCards, 
    SaveCard,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);