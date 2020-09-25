import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Input,
  Form,
  FormGroup,
  Alert,
  Spinner,
  Table,
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Header from 'components/Header';
import metricsRoutine from './routines';

import {
  STATE_LOADING,
  STATE_ERROR,
  STATE_OK,
} from '../../constants';

function ShortUrlMetrics(props) {
  const [shortUrlId, setShortUrlId] = useState('');

  const handleSubmit = (evt) => {
    const { getShortUrlMetrics } = props;
    evt.preventDefault();
    getShortUrlMetrics(shortUrlId);
  };

  const { shortUrlMetrics, containerState, errorMessage } = props;

  function displayShortUrlMetrics() {
    if (containerState === STATE_OK) {
      return (
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Number of Clicks</th>
            </tr>
          </thead>
          <tbody>
            {!!shortUrlMetrics &&
              // eslint-disable-next-line react/prop-types
              shortUrlMetrics.map((shortUrlMetric) => (
                <tr key={shortUrlMetric.date}>
                  <td>{shortUrlMetric.date}</td>
                  <td>{shortUrlMetric.number_of_clicks}</td>
                </tr>
              ))}
          </tbody>
        </Table>
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
                <h3>See how well your short link is doing</h3>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="shortUrlId"
                      id="shortUrlId"
                      placeholder="enter short url id e.g. bit.ly/2EfzJvJ"
                      value={shortUrlId}
                      onChange={(e) => setShortUrlId(e.target.value)}
                    />
                  </FormGroup>

                  <Button color="primary" size="lg" block>
                    Get Short URL metrics
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
    shortUrlMetrics: state.getIn(['metrics', 'shortUrlMetrics']),
    containerState: state.getIn(['metrics', 'containerState']),
    errorMessage: state.getIn(['metrics', 'errorMessage']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getShortUrlMetrics(shortUrlId) {
      dispatch(
        metricsRoutine.trigger({
          shortUrlId,
        }),
      );
    },
  };
}

ShortUrlMetrics.defaultProps = {
  shortenUrl: () => {},
  shortUrl: '',
  errorMessage: '',
};

ShortUrlMetrics.propTypes = {
  etShortUrlMetrics: PropTypes.func,
  shortUrl: PropTypes.string,
  errorMessage: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(ShortUrlMetrics);
