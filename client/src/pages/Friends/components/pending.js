import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import api from "../../../utils/API";
import { Card } from "@material-ui/core";

class Pending extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pends: [],
      user: JSON.parse(sessionStorage.getItem("user")),
    };
  }

  componentDidMount() {
    api.pendingtrips(this.state.user.id).then((res) => {
      console.log(res);
      this.setState({ pends: res.data });
    });
  }

  render() {
    if (this.state.pends.length === 0) {
      return (
        <Container>
          <Card className="p-3">
            <h4>Sorry, no invites yet!</h4>
          </Card>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          {this.state.pends.map((pend) => {
            return (
              <Container key={pend.pending.id} fluid>
                <span className="mx-2">
                  {pend.owner.firstName +
                    " " +
                    pend.owner.lastName +
                    " has invited you!"}
                </span>
                {/* <span>{pend.trip.location}</span> */}
                <span>
                  <Button
                    className="btn btn-success m-2"
                    onClick={() => {
                      api.trip_user.create({
                        userId: pend.pending.requestedId,
                        tripId: pend.trip.id,
                      });
                      api.pending.delete(pend.pending.id);
                      location.assign("/trips/" + pend.trip.id);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    className="btn btn-danger m-2"
                    onClick={() => {
                      api.pending.delete(pend.pending.id);

                      //TODO:
                      this.setState({
                        pends: this.state.pends.filter(
                          (p) => p.pending.id !== pend.pending.id
                        ),
                      });
                    }}
                  >
                    Reject
                  </Button>
                </span>
              </Container>
            );
          })}
        </Container>
      );
    }
  }
}

export default Pending;
