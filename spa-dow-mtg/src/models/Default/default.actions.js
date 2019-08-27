import axios from 'axios';
import * as SYS from '../Default/default.constants';

class DefaultSystem {
  constructor({
    serverPath = '',
    action = {
      save: () => {},
      update: () => {},
      select: () => {},
      delete: () => {},
    },
  }) {
    this.action = action;
    this.serverPath = serverPath;
    this.systemConfiguration = SYS.Config;
  }

  save() {
    return (dispatch) => {
      axios.post(this.systemConfiguration.FULL_URL + this.serverPath, {
        ...this,
      }).then(() => dispatch({
        type: `${this.action.save}_SUCCESS`,
        payload: dispatch(this.select()),
      })).catch(res => dispatch({
        type: `${this.action.save}_FAIL`,
        payload: res.error,
      }));
    };
  }

  update() {
    return (dispatch) => {
      axios.put(`${this.systemConfiguration.FULL_URL + this.serverPath}/${this.id}`, {
        ...this,
      }).then(() => dispatch({
        type: `${this.action.update}_SUCCESS`,
        payload: dispatch(this.select()),
      })).catch(res => dispatch({
        type: `${this.action.update}_FAIL`,
        payload: res.error,
      }));
    };
  }

  select(params = {}) {
    return (dispatch) => {
      axios.get(this.systemConfiguration.FULL_URL + this.serverPath, {
        params,
      }).then(res => dispatch({
        type: `${this.action.select}_SUCCESS`,
        payload: res.data,
      })).catch(res => dispatch({
        type: `${this.action.select}_FAIL`,
        payload: res.error,
      }));
    };
  }

  delete() {
    return (dispatch) => {
      axios.put(`${this.systemConfiguration.FULL_URL + this.serverPath}/${this.id}`, {
        ...this,
        isactive: false,
      }).then(() => dispatch({
        type: `${this.action.delete}_SUCCESS`,
        payload: dispatch(this.select()),
      })).catch(res => dispatch({
        type: `${this.action.delete}_FAIL`,
        payload: res.error,
      }));
    };
  }
}

export default DefaultSystem;