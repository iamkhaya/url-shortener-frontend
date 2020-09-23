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

class FileUpload extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header />
          <Jumbotron>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <h3>Upload a file </h3>

                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="enter short url"
                    />
                  </FormGroup>

                  <Button color="primary" size="lg" block>
                    Upload File
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

export default FileUpload;
