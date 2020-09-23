import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Input,
  FormGroup,
} from 'reactstrap';

import Header from 'components/Header';

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header />

          <Jumbotron>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <h3>We will shorten your url (for free) </h3>

                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="enter long url"
                    />
                  </FormGroup>

                  <Button color="primary" size="lg" block>
                    Shorten URL
                  </Button>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Home;
