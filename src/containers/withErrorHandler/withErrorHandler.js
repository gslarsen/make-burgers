import React, { Fragment, Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent) => {
  // if there's an http error, this wrapper shows a modal with the error message and
  // the wrapped component will then render any html locally as required. 

  return class extends Component {
    state = {
      error: null,
      msg: null,
    };

    updateWrapperState = (e, msg) => {
      this.setState({ error: e, msg });
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.msg : null}
          </Modal>
          <WrappedComponent {...this.props} err={this.updateWrapperState} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
