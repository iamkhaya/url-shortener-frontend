import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  CustomInput,
  Form,
  FormGroup,
  Alert,
  Spinner,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Header from 'components/Header';
import fileUploadRoutine from './routines';

import { STATE_LOADING, STATE_ERROR, STATE_OK } from '../../constants';

function FileUpload(props) {
  const [longUrlsFile, setLongUrlsFile] = useState('');

  const handleSubmit = (evt) => {
    const { getShortUrlsFile } = props;
    evt.preventDefault();
    getShortUrlsFile(longUrlsFile);
  };

  const { containerState, errorMessage } = props;

  function displayShortUrlMetrics() {
    if (containerState === STATE_OK) {
      return (
        <div>
          <p>File succesfully downloaded !</p>
        </div>
      );
    }
    if (containerState === STATE_LOADING) {
      return (
        <div>
          <Spinner color="secondary" />
        </div>
      );
    }

    if (containerState === STATE_ERROR) {
      return (
        <div>
          <Alert color="danger">Error Occurred : {errorMessage}</Alert>
          );
        </div>
      );
    }
    return <div />;
  }

  return (
    <div>
      <Container>
        <Header />
        <Jumbotron>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h3>Upload a csv file of long urls</h3>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <FormGroup>
                    <CustomInput
                      type="file"
                      id="longUrlsFile"
                      name="longUrlsFile"
                      label="Upload csv file with long urls"
                      onChange={(e) => setLongUrlsFile(e.target.files[0])}
                    />
                  </FormGroup>

                  <Button color="primary" size="lg" block>
                    Get short urls file
                  </Button>

                  <br />

                  {displayShortUrlMetrics()}
                </Form>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    processedFile: state.getIn(['fileUpload', 'processedFile']),
    containerState: state.getIn(['fileUpload', 'containerState']),
    errorMessage: state.getIn(['fileUpload', 'errorMessage']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getShortUrlsFile(longUrlsFile) {
      dispatch(
        fileUploadRoutine.trigger({
          longUrlsFile,
        }),
      );
    },
  };
}

FileUpload.defaultProps = {
  shortenUrl: () => {},
  shortUrl: '',
  errorMessage: '',
};

FileUpload.propTypes = {
  etShortUrlMetrics: PropTypes.func,
  shortUrl: PropTypes.string,
  errorMessage: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
