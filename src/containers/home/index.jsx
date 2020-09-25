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
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Header from 'components/Header';
import homeRoutine from './routines';

import {
  STATE_NEW,
  STATE_LOADING,
  STATE_ERROR,
  STATE_OK,
} from '../../constants';

function Home(props) {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (evt) => {
    const { shortenUrl } = props;
    evt.preventDefault();
    alert(`Submitting Name ${longUrl}`);
    shortenUrl(longUrl);
  };

  const { shortUrl, containerState, errorMessage } = props;

  function displayShortUrl() {
    if (containerState === STATE_OK) {
      return (
        <Alert color="dark">
          Short URL :{' '}
          <a href={shortUrl} className="alert-link">
            {shortUrl}
          </a>
          . Give it a click if you like.
        </Alert>
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
                <h3>We will shorten your url (for free) </h3>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <FormGroup>
                    <Input
                      type="url"
                      name="longUrl"
                      id="longUrl"
                      placeholder="enter long url e.g. http://www.example.io"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                    />
                  </FormGroup>

                  <Button color="primary" size="lg" block>
                    Shorten URL
                  </Button>

                  <br />

                  {displayShortUrl()}
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
    shortUrl: state.getIn(['home', 'shortUrl']),
    containerState: state.getIn(['home', 'containerState']),
    errorMessage: state.getIn(['home', 'errorMessage']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shortenUrl(longUrl) {
      dispatch(
        homeRoutine.trigger({
          longUrl,
        }),
      );
    },
  };
}

Home.defaultProps = {
  shortenUrl: () => {},
  shortUrl: '',
  errorMessage: '',
};

Home.propTypes = {
  shortenUrl: PropTypes.func,
  shortUrl: PropTypes.string,
  errorMessage: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
